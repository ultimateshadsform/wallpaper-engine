declare global {
  interface Window {
    /**
     * You can utilize the wallpaperPropertyListener and its applyUserProperties which is triggered whenever a user changes a property that you have added to your wallpaper or when the wallpaper is first loaded. The event only contains properties that have changed their value, so it's important to always check if a property is included like in the example below (yourproperty and anotherproperty should be replaced with the actual key of your properties).
     * @param {any} properties
     * @returns {any}
     */
    wallpaperPropertyListener: {
      applyUserProperties?<T extends { value?: any }>(properties: {
        [key: string]: T;
      }): void;
      applyGeneralProperties?(properties: { fps?: number }): void;
    };

    /**
     * The directory property is useful if you want to allow users to mass import images or video files. This may be useful if you want to build a slideshow or another type of wallpaper that relies on a great number of image or video files.
     * @param {string} propertyName is the name of the property that triggered the event.
     * @param {function} callback is the function that will be called when the user selects a directory.
     * @returns {void}
     */
    wallpaperRequestRandomFileForProperty?(
      propertyName: string,
      callback: (propertyName: string, filePath: string) => void
    ): void;

    /**
     * Unlike other properties, directory properties set to fetchall mode require you to use the userDirectoryFilesAddedOrChanged and userDirectoryFilesRemoved events in the wallpaperPropertyListener instead of applyUserProperties. These two event callbacks allow you to track all files that were added (or modified) and removed from the user selection.
     * @param propertyName is the name of the property that triggered the event.
     * @param changedFiles contains all added (or modified) file paths.
     * @returns {void}
     */
    userDirectoryFilesAddedOrChanged?: (
      propertyName: string,
      changedFiles: string[]
    ) => void;

    /**
     * When files are removed.
     * @param propertyName is the name of the property that triggered the event.
     * @param removedFiles contains all removed file paths.
     * @returns {void}
     */
    userDirectoryFilesRemoved?: (
      propertyName: string,
      removedFiles: string[]
    ) => void;

    /**
     * In order to get started with an audio visualizer, you have to register a listener function in JavaScript that will supply the audio volume levels to you. Wallpaper Engine provides the window.wallpaperRegisterAudioListener function for this purpose, it expects a callback function that you also need to create.
     * @param {string} propertyName
     */
    wallpaperRegisterAudioListener?: (
      callback: (audioArray: Uint8Array) => void
    ) => void;

    /**
     * This event function will be called when the media integration is turned on or off by the user in the app settings. You can utilize this to adapt your wallpaper for users who choose not to use this feature at all.
     * @param callback is the function that will be called when the media integration is turned on or off.
     */
    wallpaperRegisterMediaStatusListener?(
      callback: WallpaperMediaStatusListener
    ): void;

    /**
     * This event function will be called when the properties of the currently playing media change. It contains text information such as the song title, artist name, album name and more.
     * @param callback is the function that will be called when the media properties change.
     */
    wallpaperRegisterMediaPropertiesListener?(
      callback: WallpaperMediaPropertiesListener
    ): void;

    /**
     * This event function will be called when the thumbnail of the currently playing media changes. It contains the thumbnail of the album art and additional information, such as primary, secondary and tertiary colors used in the album art which you can utilize in your wallpaper. The thumbnail string can be set as src parameter of an img element like this: document.getElementById('mediaThumbnail').src = event.thumbnail;
     * @param callback is the function that will be called when the media thumbnail changes.
     */
    wallpaperRegisterMediaThumbnailListener?(
      callback: WallpaperMediaThumbnailListener
    ): void;

    /**
     * This event function will be called when the users starts, stops or pauses media playback. You can use the class constants to check for the appropriate state. For example: event.state == window.wallpaperMediaIntegration.playback.PLAYING.
     * @param callback is the function that will be called when the media playback state changes.
     */
    wallpaperRegisterMediaPlaybackListener?(
      callback: WallpaperMediaPlaybackListener
    ): void;

    /**
     * This event function will be called when the current time of the playing media changes. Please note: Not all media players support this feature, make sure your wallpaper also works fine when this function is never called.
     * @param callback is the function that will be called when the media playback time changes.
     */
    wallpaperRegisterMediaTimelineListener?(
      callback: WallpaperMediaTimelineListener
    ): void;

    /**
     * This function allows you to set the current playback position of the media player. Please note: Not all media players support this feature, make sure your wallpaper also works fine when this function is never called.
     */
    wallpaperPluginListener?: {
      onPluginLoaded(name: string, version: string): void;
    };

    wpPlugins?: {
      led: {
        setAllDevicesByImageData(
          encodedImageData: string,
          width: number,
          height: number
        ): void;
      };
    };
  }
}

export type WallpaperMediaPropertiesListener = (
  event: WallpaperMediaPropertiesEvent
) => void;

export type WallpaperMediaThumbnailListener = (
  event: WallpaperMediaThumbnailEvent
) => void;

export type WallpaperMediaStatusListener = (
  event: WallpaperMediaStatusEvent
) => void;

export type WallpaperMediaPlaybackListener = (
  event: WallpaperMediaPlaybackEvent
) => void;

export type WallpaperMediaTimelineListener = (
  event: WallpaperMediaTimelineEvent
) => void;

export interface WallpaperMediaPropertiesEvent {
  title: string;
  artist: string;
  subTitle: string;
  albumTitle: string;
  albumArtist: string;
  genres: string;
  contentType: 'music' | 'video' | 'image';
}

export interface WallpaperMediaThumbnailEvent {
  thumbnail: string; // Base64 encoded PNG string of the current album cover
  primaryColor: string; // Primary color of the thumbnail image
  secondaryColor: string; // Secondary color of the thumbnail image
  tertiaryColor: string; // Tertiary color of the thumbnail image
  textColor: string; // Text color guaranteed to have sufficient contrast with primary color. May be secondary or tertiary color when possible
  highContrastColor: string; // Black or white, depending on what has higher contrast with the primary color
}

export interface WallpaperMediaStatusEvent {
  enabled: boolean; // Whether the user has currently enabled the media integration option
}

export interface WallpaperMediaPlaybackEvent {
  state: WallpaperMediaPlaybackState;
}

export interface WallpaperMediaTimelineEvent {
  position: number; // The current position of the track in seconds
  duration: number; // The total duration of the track in seconds
}

export enum WallpaperMediaPlaybackState {
  PLAYBACK_PLAYING, // Media is actively playing on the system.
  PLAYBACK_PAUSED, // Media was previously playing, but playback was (temporarily) paused by the user.
  PLAYBACK_STOPPED, // Media playback is completely stopped.
}
