# Record Audio Test #

[Demo](https://lexogram.github.io/record-audio-test)

This barebones demo was made to illustrate an issue on Firefox 122.0.1 on macOS Sonoma 14.2.1 on an Apple MacBook Pro (M1).

On Firefox recording starts after a delay of about 1.5 seconds. In the menu bar, a black and white icon appears immediately when the Start Recording button is pressed. After about 1.5 seconds, a second (yellow) icon appears to indicate that recording is in progress.

This delay only occurs on Firefox. When this same demo is tested on Chrome, Edge or Opera, there is no discernible delay. On Safari, there is a delay before the MediaRecorder is ready (at which point the "Start" time is shown), but audio recording starts with no delay once the MediaRecorder is ready.

In Firefox, the promise for the MediaRecorder resolves, but nothing is recorded for about 1.5 seconds after that.