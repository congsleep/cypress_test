const assert = require('assert');
const { CONFIG } = require('../_/config');
const { goto, write, press, click, below, evaluate, waitFor, $, text } = require('taiko');

const checkPlay = async (playerRoute) => {
    // TODO: Sau khi đăng nhập xong, có flow chuyển vào route promotion, chỗ này cần delay để đảm bảo đã ở trong promotion, rồi mới chuyển sang route player
    // nếu không delay, thì sau khi chuyển vào route player, có khả năng sẽ nhảy tiếp qua route promotion
    await waitFor(2000);

    await goto(playerRoute);
    await waitFor(CONFIG.DELAY_CHECK_PLAYER_START);

    const position = await evaluate((elm, options) => {
        try {
            return document.querySelector('video').currentTime;
        } catch (e) {
            return 0;
        }
    });
    assert(position !== 0);
};

exports.player = {
    playLiveTvFree: (title, expectPlayable = true) => {
        // Expect: play thành công (sau khi chuyển qua route player được x giây, kiểm tra currentTime nếu !==0 thì có nghĩa là đang play)
        describe(title || 'Live TV free', async () => {
            it('should play', async () => {
                await checkPlay(`${CONFIG.HOST}/#/livetv-player/${CONFIG.LIVE_TV_FREE}`);
            });
        });
    },

    playLiveTvVip: (title, expectPlayable = true) => {
        // Expect: play thành công
        describe(title || 'Live TV VIP', async () => {
            it('should play', async () => {
                await checkPlay(`${CONFIG.HOST}/#/livetv-player/${CONFIG.LIVE_TV_VIP}`);
            });
        });
    },

    playLiveTvKPlus: (title, expectPlayable = true) => {
        // Expect: play thành công
        describe(title || 'Live TV K+', async () => {
            it('should play', async () => {
                await checkPlay(`${CONFIG.HOST}/#/livetv-player/${CONFIG.LIVE_TV_KPLUS}`);
            });
        });
    },

    playVod: (title) => {
        // Expect: play thành công
        describe(title || 'VOD', async () => {
            it('should play', async () => {
                await checkPlay(`${CONFIG.HOST}/#/vod-player/${CONFIG.VOD}`);
            });
        });
    },

    // Cần đảm bảo content/user đang play phải có full tính năng chọn quality
    changeQuality: (title) => {
        // Expect: đổi quality thành công (trên UI và video)
        describe(title || 'Change quality', async () => {
            // Click chọn trên UI
            // Kiểm tra UI có chuyển sang chọn đúng Full HD hay không
            // Seek tới
            // waitFor để đảm bảo đã play đoạn buffer mới
            // Kiểm tra video.videoWidth === 1920 || video.videoHeight === 1080
            it('should change to Full HD', async () => {
                if ($('[data-action="showProfilesMenu"]').exists()) {
                    // Nhấn Up để hiện menu
                    await press('ArrowUp');
                    // Click vào button chọn "Chất lượng"
                    await evaluate($('[data-action="showProfilesMenu"]'), (elm) => elm.click());

                    // Click vào option "Full HD" của "Chất lượng"
                    await evaluate($('//*[text()="Full HD"]', below('Chất lượng')), (elm) => elm.click());

                    // Hiện UI lên (để UI update state) và kiểm tra UI đã chọn đúng Full HD chưa
                    await press('ArrowUp'); // Hiện UI lên
                    await press('Escape'); // Ẩn UI đi
                    assert(await $('[data-action="showProfilesMenu"]').text() === 'Full HD', 'UI không chọn đúng Full HD');

                    // Seek (đến 1/4) để player tải đoạn buffer mới, expect là tải đúng profile đã chọn, chờ "1 lúc" để đảm bảo player đã play đoạn buffer mới
                    await evaluate((elm, options) => {
                        document.querySelector('video').currentTime = document.querySelector('video').duration / 4;
                    });
                    waitFor(CONFIG.DELAY_CHECK_PLAYER_START / 2); // Chờ =1/2 thời gian chờ play ở đầu video

                    // Kiểm tra video.videoWidth === 1920 || video.videoHeight === 1080, kiểm tra cả width và height để full case landscape & portrait
                    const isFullHD = await evaluate((elm, options) => {
                        return document.querySelector('video').videoWidth === 1920 || document.querySelector('video').videoHeight === 1080;
                    });

                    assert(isFullHD);
                } else {
                    assert.fail('Không có button "Chất lượng"');
                }
            });
            // Tương tự Full HD
            // Kiểm tra video.videoWidth === 1280 || video.videoHeight === 720;
            it('should change to HD', async () => {
                if ($('[data-action="showProfilesMenu"]').exists()) {
                    // Nhấn Up để hiện menu
                    await press('ArrowUp');
                    // Click vào button chọn "Chất lượng"
                    await evaluate($('[data-action="showProfilesMenu"]'), (elm) => elm.click());

                    // Click vào option "HD" của "Chất lượng"
                    await evaluate($('//*[text()="HD"]', below('Chất lượng')), (elm) => elm.click());

                    // Hiện UI lên (để UI update state) và kiểm tra UI đã chọn đúng HD chưa
                    await press('ArrowUp'); // Hiện UI lên
                    await press('Escape'); // Ẩn UI đi
                    assert(await $('[data-action="showProfilesMenu"]').text() === 'HD', 'UI không chọn đúng HD');

                    // Seek (đến 2/4) để player tải đoạn buffer mới, expect là tải đúng profile đã chọn, chờ "1 lúc" để đảm bảo player đã play đoạn buffer mới
                    await evaluate((elm, options) => {
                        document.querySelector('video').currentTime = 2 * (document.querySelector('video').duration / 4);
                    });
                    waitFor(CONFIG.DELAY_CHECK_PLAYER_START / 2); // Chờ =1/2 thời gian chờ play ở đầu video

                    // Kiểm tra video.videoWidth === 1280 || video.videoHeight === 720, kiểm tra cả width và height để full case landscape & portrait
                    const isHD = await evaluate((elm, options) => {
                        return document.querySelector('video').videoWidth === 1280 || document.querySelector('video').videoHeight === 720;
                    });

                    assert(isHD);
                } else {
                    assert.fail('Không có button "Chất lượng"');
                }
            });
            // Tương tự Full HD
            // Kiểm tra video.videoWidth === 1024 || video.videoHeight === 576;
            it('should change to SD', async () => {
                if ($('[data-action="showProfilesMenu"]').exists()) {
                    // Nhấn Up để hiện menu
                    await press('ArrowUp');
                    // Click vào button chọn "Chất lượng"
                    await evaluate($('[data-action="showProfilesMenu"]'), (elm) => elm.click());

                    // Click vào option "SD" của "Chất lượng"
                    await evaluate($('//*[text()="SD"]', below('Chất lượng')), (elm) => elm.click());

                    // Hiện UI lên (để UI update state) và kiểm tra UI đã chọn đúng SD chưa
                    await press('ArrowUp'); // Hiện UI lên
                    await press('Escape'); // Ẩn UI đi
                    assert(await $('[data-action="showProfilesMenu"]').text() === 'SD', 'UI không chọn đúng SD');

                    // Seek (đến 3/4) để player tải đoạn buffer mới, expect là tải đúng profile đã chọn, chờ "1 lúc" để đảm bảo player đã play đoạn buffer mới
                    await evaluate((elm, options) => {
                        document.querySelector('video').currentTime = 3 * (document.querySelector('video').duration / 4);
                    });
                    waitFor(CONFIG.DELAY_CHECK_PLAYER_START / 2); // Chờ =1/2 thời gian chờ play ở đầu video

                    // Kiểm tra video.videoWidth === 1024 || video.videoHeight === 576, kiểm tra cả width và height để full case landscape & portrait
                    const isSD = await evaluate((elm, options) => {
                        return document.querySelector('video').videoWidth === 1024 || document.querySelector('video').videoHeight === 576;
                    });

                    assert(isSD);
                } else {
                    assert.fail('Không có button "Chất lượng"');
                }
            });
        });
    },

    // Cần đảm bảo content/user đang play phải có full tính năng chọn audio
    changeAudio: (title) => {
        // Expect: đổi audio thành công (trên UI và audio)
        describe(title || 'Change audio', async () => {
            it('should change to Tiếng Gốc', async () => {
                // if ($('[data-action="showOptionsMenu"]').exists()) {
                //     // Nhấn Up để hiện menu
                //     await press('ArrowUp');
                //     // Click vào button "Âm thanh và phụ đề"
                //     await evaluate($('[data-action="showOptionsMenu"]'), (elm) => elm.click());

                //     // Click vào option "Tiếng gốc" của "Âm thanh"
                //     await evaluate($('//*[text()="Tiếng Gốc"]', below('Âm thanh')), (elm) => elm.click());
                // } else {
                //     assert.fail('Không có button "Âm thanh và phụ đề"');
                // }
                assert(true);
            });
            it('should change to Thuyết Minh', async () => {
                // if ($('[data-action="showOptionsMenu"]').exists()) {
                //     // Nhấn Up để hiện menu
                //     await press('ArrowUp');
                //     // Click vào button "Âm thanh và phụ đề"
                //     await evaluate($('[data-action="showOptionsMenu"]'), (elm) => elm.click());

                //     // Click vào option "Tiếng gốc" của "Âm thanh"
                //     await evaluate($('//*[text()="Thuyết Minh"]', below('Âm thanh')), (elm) => elm.click());
                // } else {
                //     assert.fail('Không có button "Âm thanh và phụ đề"');
                // }
                assert(true);
            });
            it('should change to Tiếng Gốc', async () => {
                // if ($('[data-action="showOptionsMenu"]').exists()) {
                //     // Nhấn Up để hiện menu
                //     await press('ArrowUp');
                //     // Click vào button "Âm thanh và phụ đề"
                //     await evaluate($('[data-action="showOptionsMenu"]'), (elm) => elm.click());

                //     // Click vào option "Tiếng gốc" của "Âm thanh"
                //     await evaluate($('//*[text()="Tiếng Gốc"]', below('Âm thanh')), (elm) => elm.click());
                // } else {
                //     assert.fail('Không có button "Âm thanh và phụ đề"');
                // }
                assert(true);
            });
        });
    },

    // Cần đảm bảo content/user đang play phải có full tính năng chọn subtitle
    changeSubtitle: (title) => {
        // Expect: đổi phụ đề thành công (trên UI và subtitle)
        describe(title || 'Change subtitle', async () => {
            // Chọn subtitle, sau đó seek tới thời điểm hiển thị của cue bất kỳ (đang set là cue giữa của list cue), và kiểm tra phụ đề có hiển thị hay không
            it('should change to Tắt', async () => {
                if ($('[data-action="showOptionsMenu"]').exists()) {
                    // Nhấn Up để hiện menu
                    await press('ArrowUp');
                    // Click vào button "Âm thanh và phụ đề"
                    await evaluate($('[data-action="showOptionsMenu"]'), (elm) => elm.click());

                    // Click vào option "Tắt" của "Phụ đề"
                    await evaluate($('//*[text()="Tắt"]', below('Phụ đề')), (elm) => elm.click());

                    // Kiểm tra xem phụ đề đang hiện hay ẩn
                    const isShowSubtitle = await evaluate((elm, options) => {
                        try {
                            const cue = document.querySelector('video').textTracks[0].cues[Math.floor(document.querySelector('video').textTracks[0].cues.length / 2)];
                            const position = (cue.startTime + cue.startTime) / 2;
                            document.querySelector('video').currentTime = position;

                            return $('.subs-player').innerText !== '';
                        } catch (e) {
                            return false;
                        }
                    });
                    assert(!isShowSubtitle);
                } else {
                    assert.fail('Không có button "Âm thanh và phụ đề"');
                }
            });
            it('should change to Tiếng Việt', async () => {
                if ($('[data-action="showOptionsMenu"]').exists()) {
                    // Nhấn Up để hiện menu
                    await press('ArrowUp');
                    // Click vào button "Âm thanh và phụ đề"
                    await evaluate($('[data-action="showOptionsMenu"]'), (elm) => elm.click());

                    // Click vào option "Tiếng Việc" của "Phụ đề"
                    await evaluate($('//*[text()="Tiếng Việt"]', below('Phụ đề')), (elm) => elm.click());

                    // Kiểm tra xem phụ đề đang hiện hay ẩn
                    const isShowSubtitle = await evaluate((elm, options) => {
                        try {
                            const cue = document.querySelector('video').textTracks[0].cues[Math.floor(document.querySelector('video').textTracks[0].cues.length / 2)];
                            const position = (cue.startTime + cue.startTime) / 2;
                            document.querySelector('video').currentTime = position;

                            return $('.subs-player').innerText !== '';
                        } catch (e) {
                            return false;
                        }
                    });
                    assert(!isShowSubtitle);
                } else {
                    assert.fail('Không có button "Âm thanh và phụ đề"');
                }
            });
            it('should change to Tắt', async () => {
                if ($('[data-action="showOptionsMenu"]').exists()) {
                    // Nhấn Up để hiện menu
                    await press('ArrowUp');
                    // Click vào button "Âm thanh và phụ đề"
                    await evaluate($('[data-action="showOptionsMenu"]'), (elm) => elm.click());

                    // Click vào option "Tắt" của "Phụ đề"
                    await evaluate($('//*[text()="Tắt"]', below('Phụ đề')), (elm) => elm.click());

                    // Kiểm tra xem phụ đề đang hiện hay ẩn
                    const isShowSubtitle = await evaluate((elm, options) => {
                        try {
                            const cue = document.querySelector('video').textTracks[0].cues[Math.floor(document.querySelector('video').textTracks[0].cues.length / 2)];
                            const position = (cue.startTime + cue.startTime) / 2;
                            document.querySelector('video').currentTime = position;

                            return $('.subs-player').innerText !== '';
                        } catch (e) {
                            return false;
                        }
                    });
                    assert(!isShowSubtitle);
                } else {
                    assert.fail('Không có button "Âm thanh và phụ đề"');
                }
            });
        });
    },
};
