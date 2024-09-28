/**
 * The possible definitions related to dates.
 */
type DateDefinition = LocaleEntry<{
    /**
     * The translations for months (January - December).
     */
    month: DateEntryDefinition;
    /**
     * The translations for weekdays (Sunday - Saturday).
     */
    weekday: DateEntryDefinition;
    /**
     * The names of the IANA time zones. Not tied to the current locale.
     *
     * Since this is the same for all locales, it is only defined in the `base` locale.
     *
     * @see [IANA Time Zone Database](https://www.iana.org/time-zones)
     */
    time_zone: string[];
}>;
/**
 * The possible definitions related to date entries.
 */
interface DateEntryDefinition {
    /**
     * The long name of the entry.
     */
    wide: string[];
    /**
     * The short name/abbreviation of the entry.
     * If null, the locale does not support a short name/abbreviation for the entry.
     */
    abbr: string[] | null;
    /**
     * The wide name of the entry when used in context. If absent wide will be used instead.
     * It is used to specify a word in context, which may differ from a stand-alone word.
     */
    wide_context?: string[];
    /**
     * The short name/abbreviation name of the entry when used in context. If absent abbr will be used instead.
     * It is used to specify a word in context, which may differ from a stand-alone word.
     */
    abbr_context?: string[];
}

/**
 * A proxy for LocaleDefinition that marks all properties as required and throws an error when an entry is accessed that is not defined.
 */
type LocaleProxy = Readonly<{
    [key in keyof LocaleDefinition]-?: LocaleProxyCategory<LocaleDefinition[key]>;
}>;
type LocaleProxyCategory<T> = Readonly<{
    [key in keyof T]-?: LocaleProxyEntry<T[key]>;
}>;
type LocaleProxyEntry<T> = unknown extends T ? T : Readonly<NonNullable<T>>;

/**
 * Color space names supported by CSS.
 */
declare enum CssSpace {
    SRGB = "sRGB",
    DisplayP3 = "display-p3",
    REC2020 = "rec2020",
    A98RGB = "a98-rgb",
    ProphotoRGB = "prophoto-rgb"
}
/**
 * Color space names supported by CSS.
 */
type CssSpaceType = `${CssSpace}`;
/**
 * Functions supported by CSS to produce color.
 */
declare enum CssFunction {
    RGB = "rgb",
    RGBA = "rgba",
    HSL = "hsl",
    HSLA = "hsla",
    HWB = "hwb",
    CMYK = "cmyk",
    LAB = "lab",
    LCH = "lch",
    COLOR = "color"
}
/**
 * Functions supported by CSS to produce color.
 */
type CssFunctionType = `${CssFunction}`;
type StringColorFormat = 'css' | 'binary';
type NumberColorFormat = 'decimal';
type ColorFormat = StringColorFormat | NumberColorFormat;
type Casing$1 = 'lower' | 'upper' | 'mixed';
/**
 * Module to generate colors.
 *
 * ### Overview
 *
 * For a human-readable color like `'red'`, use [`human()`](https://fakerjs.dev/api/color.html#human).
 *
 * For a hex color like `#ff0000` used in HTML/CSS, use [`rgb()`](https://fakerjs.dev/api/color.html#rgb). There are also methods for other color formats such as [`hsl()`](https://fakerjs.dev/api/color.html#hsl), [`cmyk()`](https://fakerjs.dev/api/color.html#cmyk), [`hwb()`](https://fakerjs.dev/api/color.html#hwb), [`lab()`](https://fakerjs.dev/api/color.html#lab), and [`lch()`](https://fakerjs.dev/api/color.html#lch).
 */
declare class ColorModule extends ModuleBase {
    /**
     * Returns a random human-readable color name.
     *
     * @example
     * faker.color.human() // 'red'
     *
     * @since 7.0.0
     */
    human(): string;
    /**
     * Returns a random color space name from the worldwide accepted color spaces.
     * Source: https://en.wikipedia.org/wiki/List_of_color_spaces_and_their_uses
     *
     * @example
     * faker.color.space() // 'sRGB'
     *
     * @since 7.0.0
     */
    space(): string;
    /**
     * Returns a random css supported color function name.
     *
     * @example
     * faker.color.cssSupportedFunction() // 'rgb'
     *
     * @since 7.0.0
     */
    cssSupportedFunction(): CssFunctionType;
    /**
     * Returns a random css supported color space name.
     *
     * @example
     * faker.color.cssSupportedSpace() // 'display-p3'
     *
     * @since 7.0.0
     */
    cssSupportedSpace(): CssSpaceType;
    /**
     * Returns an RGB color.
     *
     * @example
     * faker.color.rgb() // '#8be4ab'
     *
     * @since 7.0.0
     */
    rgb(): string;
    /**
     * Returns an RGB color.
     *
     * @param options Options object.
     * @param options.prefix Prefix of the generated hex color. Only applied when 'hex' format is used. Defaults to `'#'`.
     * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'lower'`.
     * @param options.format Format of generated RGB color. Defaults to `hex`.
     * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
     *
     * @example
     * faker.color.rgb() // '#0d7f26'
     * faker.color.rgb({ prefix: '0x' }) // '0x9ddc8b'
     * faker.color.rgb({ casing: 'upper' }) // '#B8A51E'
     * faker.color.rgb({ casing: 'lower' }) // '#b12f8b'
     * faker.color.rgb({ prefix: '#', casing: 'lower' }) // '#eb0c16'
     * faker.color.rgb({ format: 'hex', casing: 'lower' }) // '#bb9d17'
     * faker.color.rgb({ format: 'css' }) // 'rgb(216, 17, 192)'
     * faker.color.rgb({ format: 'binary' }) // '00110010 00001000 01110110'
     * faker.color.rgb({ includeAlpha: true }) // '#f96efb5e'
     * faker.color.rgb({ format: 'css', includeAlpha: true }) // 'rgba(180, 158, 24, 0.75)'
     *
     * @since 7.0.0
     */
    rgb(options?: {
        /**
         * Prefix of the generated hex color. Only applied when 'hex' format is used.
         *
         * @default '#'
         */
        prefix?: string;
        /**
         * Letter type case of the generated hex color. Only applied when `'hex'` format is used.
         *
         * @default 'lower'
         */
        casing?: Casing$1;
        /**
         * Format of generated RGB color.
         *
         * @default 'hex'
         */
        format?: 'hex' | StringColorFormat;
        /**
         * Adds an alpha value to the color (RGBA).
         *
         * @default false
         */
        includeAlpha?: boolean;
    }): string;
    /**
     * Returns an RGB color.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'hex'`.
     * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
     *
     * @example
     * faker.color.rgb() // '0x8be4ab'
     * faker.color.rgb({ format: 'decimal' }) // [64, 192,174]
     * faker.color.rgb({ format: 'decimal', includeAlpha: true }) // [52, 250, 209, 0.21]
     *
     * @since 7.0.0
     */
    rgb(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'hex'
         */
        format?: NumberColorFormat;
        /**
         * Adds an alpha value to the color (RGBA).
         *
         * @default false
         */
        includeAlpha?: boolean;
    }): number[];
    /**
     * Returns an RGB color.
     *
     * @param options Options object.
     * @param options.prefix Prefix of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'#'`.
     * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'lower'`.
     * @param options.format Format of generated RGB color. Defaults to `'hex'`.
     * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
     *
     * @example
     * faker.color.rgb() // '#0d7f26'
     * faker.color.rgb({ prefix: '0x' }) // '0x9ddc8b'
     * faker.color.rgb({ casing: 'upper' }) // '#B8A51E'
     * faker.color.rgb({ casing: 'lower' }) // '#b12f8b'
     * faker.color.rgb({ prefix: '#', casing: 'lower' }) // '#eb0c16'
     * faker.color.rgb({ format: 'hex', casing: 'lower' }) // '#bb9d17'
     * faker.color.rgb({ format: 'decimal' }) // [64, 192,174]
     * faker.color.rgb({ format: 'css' }) // 'rgb(216, 17, 192)'
     * faker.color.rgb({ format: 'binary' }) // '00110010 00001000 01110110'
     * faker.color.rgb({ includeAlpha: true }) // '#f96efb5e'
     * faker.color.rgb({ format: 'css', includeAlpha: true }) // 'rgba(180, 158, 24, 0.75)'
     * faker.color.rgb({ format: 'decimal', includeAlpha: true }) // [52, 250, 209, 0.21]
     *
     * @since 7.0.0
     */
    rgb(options?: {
        /**
         * Prefix of the generated hex color. Only applied when `'hex'` format is used.
         *
         * @default '#'
         */
        prefix?: string;
        /**
         * Letter type case of the generated hex color. Only applied when `'hex'` format is used.
         *
         * @default 'lower'
         */
        casing?: Casing$1;
        /**
         * Format of generated RGB color.
         *
         * @default 'hex'
         */
        format?: 'hex' | ColorFormat;
        /**
         * Adds an alpha value to the color (RGBA).
         *
         * @default false
         */
        includeAlpha?: boolean;
    }): string | number[];
    /**
     * Returns a CMYK color.
     *
     * @example
     * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
     *
     * @since 7.0.0
     */
    cmyk(): number[];
    /**
     * Returns a CMYK color.
     *
     * @param options Options object.
     * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
     * faker.color.cmyk({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
     * faker.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
     *
     * @since 7.0.0
     */
    cmyk(options?: {
        /**
         * Format of generated CMYK color.
         *
         * @default 'decimal'
         */
        format?: StringColorFormat;
    }): string;
    /**
     * Returns a CMYK color.
     *
     * @param options Options object.
     * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
     * faker.color.cmyk({ format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
     *
     * @since 7.0.0
     */
    cmyk(options?: {
        /**
         * Format of generated CMYK color.
         *
         * @default 'decimal'
         */
        format?: NumberColorFormat;
    }): number[];
    /**
     * Returns a CMYK color.
     *
     * @param options Options object.
     * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
     * faker.color.cmyk({ format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
     * faker.color.cmyk({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
     * faker.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
     *
     * @since 7.0.0
     */
    cmyk(options?: {
        /**
         * Format of generated CMYK color.
         *
         * @default 'decimal'
         */
        format?: ColorFormat;
    }): string | number[];
    /**
     * Returns an HSL color.
     *
     * @example
     * faker.color.hsl() // [201, 0.23, 0.32]
     *
     * @since 7.0.0
     */
    hsl(): number[];
    /**
     * Returns an HSL color.
     *
     * @param options Options object.
     * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
     * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
     *
     * @example
     * faker.color.hsl() // [201, 0.23, 0.32]
     * faker.color.hsl({ format: 'css' }) // hsl(0deg, 100%, 80%)
     * faker.color.hsl({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
     * faker.color.hsl({ format: 'binary' }) // (8-32 bits) x 3
     * faker.color.hsl({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
     *
     * @since 7.0.0
     */
    hsl(options?: {
        /**
         * Format of generated HSL color.
         *
         * @default 'decimal'
         */
        format?: StringColorFormat;
        /**
         * Adds an alpha value to the color (RGBA).
         *
         * @default false
         */
        includeAlpha?: boolean;
    }): string;
    /**
     * Returns an HSL color.
     *
     * @param options Options object.
     * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
     * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
     *
     * @example
     * faker.color.hsl() // [201, 0.23, 0.32]
     * faker.color.hsl({ format: 'decimal' }) // [300, 0.21, 0.52]
     * faker.color.hsl({ format: 'decimal', includeAlpha: true }) // [300, 0.21, 0.52, 0.28]
     *
     * @since 7.0.0
     */
    hsl(options?: {
        /**
         * Format of generated HSL color.
         *
         * @default 'decimal'
         */
        format?: NumberColorFormat;
        /**
         * Adds an alpha value to the color (RGBA).
         *
         * @default false
         */
        includeAlpha?: boolean;
    }): number[];
    /**
     * Returns an HSL color.
     *
     * @param options Options object.
     * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
     * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
     *
     * @example
     * faker.color.hsl() // [201, 0.23, 0.32]
     * faker.color.hsl({ format: 'decimal' }) // [300, 0.21, 0.52]
     * faker.color.hsl({ format: 'decimal', includeAlpha: true }) // [300, 0.21, 0.52, 0.28]
     * faker.color.hsl({ format: 'css' }) // hsl(0deg, 100%, 80%)
     * faker.color.hsl({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
     * faker.color.hsl({ format: 'binary' }) // (8-32 bits) x 3
     * faker.color.hsl({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
     *
     * @since 7.0.0
     */
    hsl(options?: {
        /**
         * Format of generated HSL color.
         *
         * @default 'decimal'
         */
        format?: ColorFormat;
        /**
         * Adds an alpha value to the color (RGBA).
         *
         * @default false
         */
        includeAlpha?: boolean;
    }): string | number[];
    /**
     * Returns an HWB color.
     *
     * @example
     * faker.color.hwb() // [201, 0.21, 0.31]
     *
     * @since 7.0.0
     */
    hwb(): number[];
    /**
     * Returns an HWB color.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.hwb() // [201, 0.21, 0.31]
     * faker.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
     * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
     *
     * @since 7.0.0
     */
    hwb(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: StringColorFormat;
    }): string;
    /**
     * Returns an HWB color.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.hwb() // [201, 0.21, 0.31]
     * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
     *
     * @since 7.0.0
     */
    hwb(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: NumberColorFormat;
    }): number[];
    /**
     * Returns an HWB color.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.hwb() // [201, 0.21, 0.31]
     * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
     * faker.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
     * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
     *
     * @since 7.0.0
     */
    hwb(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: ColorFormat;
    }): string | number[];
    /**
     * Returns a LAB (CIELAB) color.
     *
     * @example
     * faker.color.lab() // [0.832133, -80.3245, 100.1234]
     *
     * @since 7.0.0
     */
    lab(): number[];
    /**
     * Returns a LAB (CIELAB) color.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.lab() // [0.832133, -80.3245, 100.1234]
     * faker.color.lab({ format: 'css' }) // lab(29.2345% 39.3825 20.0664)
     * faker.color.lab({ format: 'binary' }) // (8-32 bits x 3)
     *
     * @since 7.0.0
     */
    lab(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: StringColorFormat;
    }): string;
    /**
     * Returns a LAB (CIELAB) color.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.lab() // [0.832133, -80.3245, 100.1234]
     * faker.color.lab({ format: 'decimal' }) // [0.856773, -80.2345, 100.2341]
     *
     * @since 7.0.0
     */
    lab(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: NumberColorFormat;
    }): number[];
    /**
     * Returns a LAB (CIELAB) color.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.lab() // [0.832133, -80.3245, 100.1234]
     * faker.color.lab({ format: 'decimal' }) // [0.856773, -80.2345, 100.2341]
     * faker.color.lab({ format: 'css' }) // lab(29.2345% 39.3825 20.0664)
     * faker.color.lab({ format: 'binary' }) // (8-32 bits x 3)
     *
     * @since 7.0.0
     */
    lab(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: ColorFormat;
    }): string | number[];
    /**
     * Returns an LCH color. Even though upper bound of
     * chroma in LCH color space is theoretically unbounded,
     * it is bounded to 230 as anything above will not
     * make a noticeable difference in the browser.
     *
     * @example
     * faker.color.lch() // [0.522345, 72.2, 56.2]
     *
     * @since 7.0.0
     */
    lch(): number[];
    /**
     * Returns an LCH color. Even though upper bound of
     * chroma in LCH color space is theoretically unbounded,
     * it is bounded to 230 as anything above will not
     * make a noticeable difference in the browser.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.lch() // [0.522345, 72.2, 56.2]
     * faker.color.lch({ format: 'css' }) // lch(52.2345% 72.2 56.2)
     * faker.color.lch({ format: 'binary' }) // (8-32 bits x 3)
     *
     * @since 7.0.0
     */
    lch(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: StringColorFormat;
    }): string;
    /**
     * Returns an LCH color. Even though upper bound of
     * chroma in LCH color space is theoretically unbounded,
     * it is bounded to 230 as anything above will not
     * make a noticeable difference in the browser.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.lch() // [0.522345, 72.2, 56.2]
     * faker.color.lch({ format: 'decimal' }) // [0.522345, 72.2, 56.2]
     *
     * @since 7.0.0
     */
    lch(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: NumberColorFormat;
    }): number[];
    /**
     * Returns an LCH color. Even though upper bound of
     * chroma in LCH color space is theoretically unbounded,
     * it is bounded to 230 as anything above will not
     * make a noticeable difference in the browser.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     *
     * @example
     * faker.color.lch() // [0.522345, 72.2, 56.2]
     * faker.color.lch({ format: 'decimal' }) // [0.522345, 72.2, 56.2]
     * faker.color.lch({ format: 'css' }) // lch(52.2345% 72.2 56.2)
     * faker.color.lch({ format: 'binary' }) // (8-32 bits x 3)
     *
     * @since 7.0.0
     */
    lch(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: ColorFormat;
    }): string | number[];
    /**
     * Returns a random color based on CSS color space specified.
     *
     * @example
     * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
     *
     * @since 7.0.0
     */
    colorByCSSColorSpace(): number[];
    /**
     * Returns a random color based on CSS color space specified.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
     *
     * @example
     * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
     * faker.color.colorByCSSColorSpace({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
     * faker.color.colorByCSSColorSpace({ format: 'binary' }) // (8-32 bits x 3)
     *
     * @since 7.0.0
     */
    colorByCSSColorSpace(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: StringColorFormat;
        /**
         * Color space to generate the color for.
         *
         * @default 'sRGB'
         */
        space?: CssSpaceType;
    }): string;
    /**
     * Returns a random color based on CSS color space specified.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
     *
     * @example
     * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
     * faker.color.colorByCSSColorSpace({ format: 'decimal' }) // [0.12, 0.21, 0.31]
     *
     * @since 7.0.0
     */
    colorByCSSColorSpace(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: NumberColorFormat;
        /**
         * Color space to generate the color for.
         *
         * @default 'sRGB'
         */
        space?: CssSpaceType;
    }): number[];
    /**
     * Returns a random color based on CSS color space specified.
     *
     * @param options Options object.
     * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
     * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
     *
     * @example
     * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
     * faker.color.colorByCSSColorSpace({ format: 'decimal' }) // [0.12, 0.21, 0.31]
     * faker.color.colorByCSSColorSpace({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
     * faker.color.colorByCSSColorSpace({ format: 'binary' }) // (8-32 bits x 3)
     *
     * @since 7.0.0
     */
    colorByCSSColorSpace(options?: {
        /**
         * Format of generated RGB color.
         *
         * @default 'decimal'
         */
        format?: ColorFormat;
        /**
         * Color space to generate the color for.
         *
         * @default 'sRGB'
         */
        space?: CssSpaceType;
    }): string | number[];
}

/**
 * Module to generate dates (without methods requiring localized data).
 */
declare class SimpleDateModule extends SimpleModuleBase {
    /**
     * Generates a random date that can be either in the past or in the future.
     *
     * @param options The optional options object.
     * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
     *
     * @see faker.date.between(): For generating dates in a specific range.
     * @see faker.date.past(): For generating dates explicitly in the past.
     * @see faker.date.future(): For generating dates explicitly in the future.
     *
     * @example
     * faker.date.anytime() // '2022-07-31T01:33:29.567Z'
     *
     * @since 8.0.0
     */
    anytime(options?: {
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    }): Date;
    /**
     * Generates a random date in the past.
     *
     * @param options The optional options object.
     * @param options.years The range of years the date may be in the past. Defaults to `1`.
     * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
     *
     * @see faker.date.recent(): For generating dates in the recent past (days instead of years).
     *
     * @example
     * faker.date.past() // '2021-12-03T05:40:44.408Z'
     * faker.date.past({ years: 10 }) // '2017-10-25T21:34:19.488Z'
     * faker.date.past({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2017-08-18T02:59:12.350Z'
     *
     * @since 8.0.0
     */
    past(options?: {
        /**
         * The range of years the date may be in the past.
         *
         * @default 1
         */
        years?: number;
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    }): Date;
    /**
     * Generates a random date in the future.
     *
     * @param options The optional options object.
     * @param options.years The range of years the date may be in the future. Defaults to `1`.
     * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
     *
     * @see faker.date.soon(): For generating dates in the near future (days instead of years).
     *
     * @example
     * faker.date.future() // '2022-11-19T05:52:49.100Z'
     * faker.date.future({ years: 10 }) // '2030-11-23T09:38:28.710Z'
     * faker.date.future({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-12-13T22:45:10.252Z'
     *
     * @since 8.0.0
     */
    future(options?: {
        /**
         * The range of years the date may be in the future.
         *
         * @default 1
         */
        years?: number;
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    }): Date;
    /**
     * Generates a random date between the given boundaries.
     *
     * @param options The options object.
     * @param options.from The early date boundary.
     * @param options.to The late date boundary.
     *
     * @throws If `from` or `to` are not provided.
     * @throws If `from` is after `to`.
     *
     * @example
     * faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }) // '2026-05-16T02:22:53.002Z'
     *
     * @since 8.0.0
     */
    between(options: {
        /**
         * The early date boundary.
         */
        from: string | Date | number;
        /**
         * The late date boundary.
         */
        to: string | Date | number;
    }): Date;
    /**
     * Generates random dates between the given boundaries. The dates will be returned in an array sorted in chronological order.
     *
     * @param options The options object.
     * @param options.from The early date boundary.
     * @param options.to The late date boundary.
     * @param options.count The number of dates to generate. Defaults to `3`.
     *
     * @throws If `from` or `to` are not provided.
     * @throws If `from` is after `to`.
     *
     * @example
     * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' })
     * // [
     * //   2022-07-02T06:00:00.000Z,
     * //   2024-12-31T12:00:00.000Z,
     * //   2027-07-02T18:00:00.000Z
     * // ]
     * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 2 })
     * // [ 2023-05-02T16:00:00.000Z, 2026-09-01T08:00:00.000Z ]
     * faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: { min: 2, max: 5 }})
     * // [
     * //   2021-12-19T06:35:40.191Z,
     * //   2022-09-10T08:03:51.351Z,
     * //   2023-04-19T11:41:17.501Z
     * // ]
     *
     * @since 8.0.0
     */
    betweens(options: {
        /**
         * The early date boundary.
         */
        from: string | Date | number;
        /**
         * The late date boundary.
         */
        to: string | Date | number;
        /**
         * The number of dates to generate.
         *
         * @default 3
         */
        count?: number | {
            /**
             * The minimum number of dates to generate.
             */
            min: number;
            /**
             * The maximum number of dates to generate.
             */
            max: number;
        };
    }): Date[];
    /**
     * Generates a random date in the recent past.
     *
     * @param options The optional options object.
     * @param options.days The range of days the date may be in the past. Defaults to `1`.
     * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
     *
     * @see faker.date.past(): For generating dates further back in time (years instead of days).
     *
     * @example
     * faker.date.recent() // '2022-02-04T02:09:35.077Z'
     * faker.date.recent({ days: 10 }) // '2022-01-29T06:12:12.829Z'
     * faker.date.recent({ days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2019-12-27T18:11:19.117Z'
     *
     * @since 8.0.0
     */
    recent(options?: {
        /**
         * The range of days the date may be in the past.
         *
         * @default 1
         */
        days?: number;
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    }): Date;
    /**
     * Generates a random date in the near future.
     *
     * @param options The optional options object.
     * @param options.days The range of days the date may be in the future. Defaults to `1`.
     * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
     *
     * @see faker.date.future(): For generating dates further in the future (years instead of days).
     *
     * @example
     * faker.date.soon() // '2022-02-05T09:55:39.216Z'
     * faker.date.soon({ days: 10 }) // '2022-02-11T05:14:39.138Z'
     * faker.date.soon({ days: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-01-01T02:40:44.990Z'
     *
     * @since 8.0.0
     */
    soon(options?: {
        /**
         * The range of days the date may be in the future.
         *
         * @default 1
         */
        days?: number;
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    }): Date;
    /**
     * Returns a random birthdate. By default, the birthdate is generated for an adult between 18 and 80 years old.
     * But you can customize the `'age'` range or the `'year'` range to generate a more specific birthdate.
     *
     * @param options The options to use to generate the birthdate.
     * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
     *
     * @example
     * faker.date.birthdate() // 1977-07-10T01:37:30.719Z
     *
     * @since 7.0.0
     */
    birthdate(options?: {
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    }): Date;
    /**
     * Returns a random birthdate for a given age range.
     *
     * @param options The options to use to generate the birthdate.
     * @param options.mode `'age'` to generate a birthdate based on the age range. It is also possible to generate a birthdate based on a `'year'` range.
     * @param options.min The minimum age to generate a birthdate for.
     * @param options.max The maximum age to generate a birthdate for.
     * @param options.refDate The date to use as reference point for the newly generated date. Defaults to `faker.defaultRefDate()`.
     *
     * @example
     * faker.date.birthdate({ mode: 'age', min: 18, max: 65 }) // 2003-11-02T20:03:20.116Z
     *
     * @since 7.0.0
     */
    birthdate(options: {
        /**
         * `'age'` to generate a birthdate based on the age range.
         * It is also possible to generate a birthdate based on a `'year'` range.
         */
        mode: 'age';
        /**
         * The minimum age to generate a birthdate for.
         */
        min: number;
        /**
         * The maximum age to generate a birthdate for.
         */
        max: number;
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    }): Date;
    /**
     * Returns a random birthdate in the given range of years.
     *
     * @param options The options to use to generate the birthdate.
     * @param options.mode `'year'` to generate a birthdate based on the year range. It is also possible to generate a birthdate based on a `'age'` range.
     * @param options.min The minimum year to generate a birthdate in.
     * @param options.max The maximum year to generate a birthdate in.
     *
     * @example
     * faker.date.birthdate({ mode: 'year', min: 1900, max: 2000 }) // 1940-08-20T08:53:07.538Z
     *
     * @since 7.0.0
     */
    birthdate(options: {
        /**
         * `'year'` to generate a birthdate based on the year range.
         * It is also possible to generate a birthdate based on an `'age'` range.
         */
        mode: 'year';
        /**
         * The minimum year to generate a birthdate in.
         */
        min: number;
        /**
         * The maximum year to generate a birthdate in.
         */
        max: number;
    }): Date;
    /**
     * Returns a random birthdate. By default, the birthdate is generated for an adult between 18 and 80 years old.
     * But you can customize the `'age'` range or the `'year'` range to generate a more specific birthdate.
     *
     * @param options The options to use to generate the birthdate.
     * @param options.mode Either `'age'` or `'year'` to generate a birthdate based on the age or year range.
     * @param options.min The minimum age or year to generate a birthdate in.
     * @param options.max The maximum age or year to generate a birthdate in.
     * @param options.refDate The date to use as reference point for the newly generated date.
     * Only used when `mode` is `'age'`.
     * Defaults to `faker.defaultRefDate()`.
     *
     * @example
     * faker.date.birthdate() // 1977-07-10T01:37:30.719Z
     * faker.date.birthdate({ mode: 'age', min: 18, max: 65 }) // 2003-11-02T20:03:20.116Z
     * faker.date.birthdate({ mode: 'year', min: 1900, max: 2000 }) // 1940-08-20T08:53:07.538Z
     *
     * @since 7.0.0
     */
    birthdate(options?: {
        /**
         * The date to use as reference point for the newly generated date.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    } | {
        /**
         * Either `'age'` or `'year'` to generate a birthdate based on the age or year range.
         */
        mode: 'age' | 'year';
        /**
         * The minimum age/year to generate a birthdate for/in.
         */
        min: number;
        /**
         * The maximum age/year to generate a birthdate for/in.
         */
        max: number;
        /**
         * The date to use as reference point for the newly generated date.
         * Only used when `mode` is `'age'`.
         *
         * @default faker.defaultRefDate()
         */
        refDate?: string | Date | number;
    }): Date;
}
/**
 * Module to generate dates.
 *
 * ### Overview
 *
 * To quickly generate a date in the past, use [`recent()`](https://fakerjs.dev/api/date.html#recent) (last day) or [`past()`](https://fakerjs.dev/api/date.html#past) (last year).
 * To quickly generate a date in the future, use [`soon()`](https://fakerjs.dev/api/date.html#soon) (next day) or [`future()`](https://fakerjs.dev/api/date.html#future) (next year).
 * For a realistic birthdate for an adult, use [`birthdate()`](https://fakerjs.dev/api/date.html#birthdate).
 *
 * For more control, any of these methods can be customized with further options, or use [`between()`](https://fakerjs.dev/api/date.html#between) to generate a single date between two dates, or [`betweens()`](https://fakerjs.dev/api/date.html#betweens) for multiple dates.
 *
 * Dates can be specified as Javascript Date objects, strings or UNIX timestamps.
 * For example to generate a date between 1st January 2000 and now, use:
 * ```ts
 * faker.date.between({ from: '2000-01-01', to: Date.now() });
 * ```
 *
 * You can generate random localized month and weekday names using [`month()`](https://fakerjs.dev/api/date.html#month) and [`weekday()`](https://fakerjs.dev/api/date.html#weekday).
 *
 * These methods have additional concerns about reproducibility, see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results).
 */
declare class DateModule extends SimpleDateModule {
    protected readonly faker: Faker;
    constructor(faker: Faker);
    /**
     * Returns a random name of a month.
     *
     * @param options The optional options to use.
     * @param options.abbreviated Whether to return an abbreviation. Defaults to `false`.
     * @param options.context Whether to return the name of a month in the context of a date. In the default `en` locale this has no effect, however, in other locales like `fr` or `ru`, this may affect grammar or capitalization, for example `'январь'` with `{ context: false }` and `'января'` with `{ context: true }` in `ru`. Defaults to `false`.
     *
     * @example
     * faker.date.month() // 'October'
     * faker.date.month({ abbreviated: true }) // 'Feb'
     * faker.date.month({ context: true }) // 'June'
     * faker.date.month({ abbreviated: true, context: true }) // 'Sep'
     *
     * @since 3.0.1
     */
    month(options?: {
        /**
         * Whether to return an abbreviation.
         *
         * @default false
         */
        abbreviated?: boolean;
        /**
         * Whether to return the name of a month in the context of a date.
         *
         * In the default `en` locale this has no effect,
         * however, in other locales like `fr` or `ru`, this may affect grammar or capitalization,
         * for example `'январь'` with `{ context: false }` and `'января'` with `{ context: true }` in `ru`.
         *
         * @default false
         */
        context?: boolean;
    }): string;
    /**
     * Returns a random day of the week.
     *
     * @param options The optional options to use.
     * @param options.abbreviated Whether to return an abbreviation. Defaults to `false`.
     * @param options.context Whether to return the day of the week in the context of a date. In the default `en` locale this has no effect, however, in other locales like `fr` or `ru`, this may affect grammar or capitalization, for example `'Lundi'` with `{ context: false }` and `'lundi'` with `{ context: true }` in `fr`. Defaults to `false`.
     *
     * @example
     * faker.date.weekday() // 'Monday'
     * faker.date.weekday({ abbreviated: true }) // 'Thu'
     * faker.date.weekday({ context: true }) // 'Thursday'
     * faker.date.weekday({ abbreviated: true, context: true }) // 'Fri'
     *
     * @since 3.0.1
     */
    weekday(options?: {
        /**
         * Whether to return an abbreviation.
         *
         * @default false
         */
        abbreviated?: boolean;
        /**
         * Whether to return the day of the week in the context of a date.
         *
         * In the default `en` locale this has no effect,
         * however, in other locales like `fr` or `ru`, this may affect grammar or capitalization,
         * for example `'Lundi'` with `{ context: false }` and `'lundi'` with `{ context: true }` in `fr`.
         *
         * @default false
         */
        context?: boolean;
    }): string;
    /**
     * Returns a random IANA time zone name.
     *
     * The returned time zone is not tied to the current locale.
     *
     * @see [IANA Time Zone Database](https://www.iana.org/time-zones)
     * @see faker.location.timeZone(): For generating a timezone based on the current locale.
     *
     * @example
     * faker.location.timeZone() // 'Pacific/Guam'
     *
     * @since 9.0.0
     */
    timeZone(): string;
}

/**
 * Module with various helper methods providing basic (seed-dependent) operations useful for implementing faker methods (without methods requiring localized data).
 */
declare class SimpleHelpersModule extends SimpleModuleBase {
    /**
     * Slugifies the given string.
     * For that all spaces (` `) are replaced by hyphens (`-`)
     * and most non word characters except for dots and hyphens will be removed.
     *
     * @param string The input to slugify. Defaults to `''`.
     *
     * @example
     * faker.helpers.slugify() // ''
     * faker.helpers.slugify("Hello world!") // 'Hello-world'
     *
     * @since 2.0.1
     */
    slugify(string?: string): string;
    /**
     * Parses the given string symbol by symbols and replaces the placeholder appropriately.
     *
     * - `#` will be replaced with a digit (`0` - `9`).
     * - `?` will be replaced with an upper letter ('A' - 'Z')
     * - and `*` will be replaced with either a digit or letter.
     *
     * @param string The template string to parse. Defaults to `''`.
     *
     * @example
     * faker.helpers.replaceSymbols() // ''
     * faker.helpers.replaceSymbols('#####') // '98441'
     * faker.helpers.replaceSymbols('?????') // 'ZYRQQ'
     * faker.helpers.replaceSymbols('*****') // '4Z3P7'
     * faker.helpers.replaceSymbols('Your pin is: #?*#?*') // '0T85L1'
     *
     * @since 3.0.0
     */
    replaceSymbols(string?: string): string;
    /**
     * Replaces the symbols and patterns in a credit card schema including Luhn checksum.
     *
     * This method supports both range patterns `[4-9]` as well as the patterns used by `replaceSymbolWithNumber()`.
     * `L` will be replaced with the appropriate Luhn checksum.
     *
     * @param string The credit card format pattern. Defaults to `'6453-####-####-####-###L'`.
     * @param symbol The symbol to replace with a digit. Defaults to `'#'`.
     *
     * @example
     * faker.helpers.replaceCreditCardSymbols() // '6453-4876-8626-8995-3771'
     * faker.helpers.replaceCreditCardSymbols('1234-[4-9]-##!!-L') // '1234-9-5298-2'
     *
     * @since 5.0.0
     */
    replaceCreditCardSymbols(string?: string, symbol?: string): string;
    /**
     * Generates a string matching the given regex like expressions.
     *
     * This function doesn't provide full support of actual `RegExp`.
     * Features such as grouping, anchors and character classes are not supported.
     * If you are looking for a library that randomly generates strings based on
     * `RegExp`s, see [randexp.js](https://github.com/fent/randexp.js)
     *
     * Supported patterns:
     * - `x{times}` => Repeat the `x` exactly `times` times.
     * - `x{min,max}` => Repeat the `x` `min` to `max` times.
     * - `[x-y]` => Randomly get a character between `x` and `y` (inclusive).
     * - `[x-y]{times}` => Randomly get a character between `x` and `y` (inclusive) and repeat it `times` times.
     * - `[x-y]{min,max}` => Randomly get a character between `x` and `y` (inclusive) and repeat it `min` to `max` times.
     * - `[^...]` => Randomly get an ASCII number or letter character that is not in the given range. (e.g. `[^0-9]` will get a random non-numeric character).
     * - `[-...]` => Include dashes in the range. Must be placed after the negate character `^` and before any character sets if used (e.g. `[^-0-9]` will not get any numeric characters or dashes).
     * - `/[x-y]/i` => Randomly gets an uppercase or lowercase character between `x` and `y` (inclusive).
     * - `x?` => Randomly decide to include or not include `x`.
     * - `[x-y]?` => Randomly decide to include or not include characters between `x` and `y` (inclusive).
     * - `x*` => Repeat `x` 0 or more times.
     * - `[x-y]*` => Repeat characters between `x` and `y` (inclusive) 0 or more times.
     * - `x+` => Repeat `x` 1 or more times.
     * - `[x-y]+` => Repeat characters between `x` and `y` (inclusive) 1 or more times.
     * - `.` => returns a wildcard ASCII character that can be any number, character or symbol. Can be combined with quantifiers as well.
     *
     * @param pattern The template string/RegExp to generate a matching string for.
     *
     * @throws If min value is more than max value in quantifier, e.g. `#{10,5}`.
     * @throws If an invalid quantifier symbol is passed in.
     *
     * @example
     * faker.helpers.fromRegExp('#{5}') // '#####'
     * faker.helpers.fromRegExp('#{2,9}') // '#######'
     * faker.helpers.fromRegExp('[1-7]') // '5'
     * faker.helpers.fromRegExp('#{3}test[1-5]') // '###test3'
     * faker.helpers.fromRegExp('[0-9a-dmno]') // '5'
     * faker.helpers.fromRegExp('[^a-zA-Z0-8]') // '9'
     * faker.helpers.fromRegExp('[a-d0-6]{2,8}') // 'a0dc45b0'
     * faker.helpers.fromRegExp('[-a-z]{5}') // 'a-zab'
     * faker.helpers.fromRegExp(/[A-Z0-9]{4}-[A-Z0-9]{4}/) // 'BS4G-485H'
     * faker.helpers.fromRegExp(/[A-Z]{5}/i) // 'pDKfh'
     * faker.helpers.fromRegExp(/.{5}/) // '14(#B'
     * faker.helpers.fromRegExp(/Joh?n/) // 'Jon'
     * faker.helpers.fromRegExp(/ABC*DE/) // 'ABDE'
     * faker.helpers.fromRegExp(/bee+p/) // 'beeeeeeeep'
     *
     * @since 8.0.0
     */
    fromRegExp(pattern: string | RegExp): string;
    /**
     * Takes an array and randomizes it in place then returns it.
     *
     * @template T The type of the elements to shuffle.
     *
     * @param list The array to shuffle.
     * @param options The options to use when shuffling.
     * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
     *
     * @example
     * faker.helpers.shuffle(['a', 'b', 'c'], { inplace: true }) // [ 'b', 'c', 'a' ]
     *
     * @since 8.0.0
     */
    shuffle<const T>(list: T[], options: {
        /**
         * Whether to shuffle the array in place or return a new array.
         *
         * @default false
         */
        inplace: true;
    }): T[];
    /**
     * Returns a randomized version of the array.
     *
     * @template T The type of the elements to shuffle.
     *
     * @param list The array to shuffle.
     * @param options The options to use when shuffling.
     * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
     *
     * @example
     * faker.helpers.shuffle(['a', 'b', 'c']) // [ 'b', 'c', 'a' ]
     * faker.helpers.shuffle(['a', 'b', 'c'], { inplace: false }) // [ 'b', 'c', 'a' ]
     *
     * @since 2.0.1
     */
    shuffle<const T>(list: ReadonlyArray<T>, options?: {
        /**
         * Whether to shuffle the array in place or return a new array.
         *
         * @default false
         */
        inplace?: false;
    }): T[];
    /**
     * Returns a randomized version of the array.
     *
     * @template T The type of the elements to shuffle.
     *
     * @param list The array to shuffle.
     * @param options The options to use when shuffling.
     * @param options.inplace Whether to shuffle the array in place or return a new array. Defaults to `false`.
     *
     * @example
     * faker.helpers.shuffle(['a', 'b', 'c']) // [ 'b', 'c', 'a' ]
     * faker.helpers.shuffle(['a', 'b', 'c'], { inplace: true }) // [ 'b', 'c', 'a' ]
     * faker.helpers.shuffle(['a', 'b', 'c'], { inplace: false }) // [ 'b', 'c', 'a' ]
     *
     * @since 2.0.1
     */
    shuffle<const T>(list: T[], options?: {
        /**
         * Whether to shuffle the array in place or return a new array.
         *
         * @default false
         */
        inplace?: boolean;
    }): T[];
    /**
     * Takes an array of strings or function that returns a string
     * and outputs a unique array of strings based on that source.
     * This method does not store the unique state between invocations.
     *
     * If there are not enough unique values to satisfy the length, if
     * the source is an array, it will only return as many items as are
     * in the array. If the source is a function, it will return after
     * a maximum number of attempts has been reached.
     *
     * @template T The type of the elements.
     *
     * @param source The strings to choose from or a function that generates a string.
     * @param length The number of elements to generate.
     *
     * @example
     * faker.helpers.uniqueArray(faker.word.sample, 50)
     * faker.helpers.uniqueArray(faker.definitions.person.first_name, 6)
     * faker.helpers.uniqueArray(["Hello", "World", "Goodbye"], 2)
     *
     * @since 6.0.0
     */
    uniqueArray<const T>(source: ReadonlyArray<T> | (() => T), length: number): T[];
    /**
     * Replaces the `{{placeholder}}` patterns in the given string mustache style.
     *
     * @param str The template string to parse.
     * @param data The data used to populate the placeholders.
     * This is a record where the key is the template placeholder,
     * whereas the value is either a string or a function suitable for `String.replace()`.
     *
     * @example
     * faker.helpers.mustache('I found {{count}} instances of "{{word}}".', {
     *   count: () => `${faker.number.int()}`,
     *   word: "this word",
     * }) // 'I found 57591 instances of "this word".'
     *
     * @since 2.0.1
     */
    mustache(str: string | undefined, data: Record<string, string | Parameters<string['replace']>[1]>): string;
    /**
     * Returns the result of the callback if the probability check was successful, otherwise `undefined`.
     *
     * @template TResult The type of result of the given callback.
     *
     * @param callback The callback to that will be invoked if the probability check was successful.
     * @param options The options to use.
     * @param options.probability The probability (`[0.00, 1.00]`) of the callback being invoked. Defaults to `0.5`.
     *
     * @example
     * faker.helpers.maybe(() => 'Hello World!') // 'Hello World!'
     * faker.helpers.maybe(() => 'Hello World!', { probability: 0.1 }) // undefined
     * faker.helpers.maybe(() => 'Hello World!', { probability: 0.9 }) // 'Hello World!'
     *
     * @since 6.3.0
     */
    maybe<const TResult>(callback: () => TResult, options?: {
        /**
         * The probability (`[0.00, 1.00]`) of the callback being invoked.
         *
         * @default 0.5
         */
        probability?: number;
    }): TResult | undefined;
    /**
     * Returns a random key from given object.
     *
     * @template T The type of the object to select from.
     *
     * @param object The object to be used.
     *
     * @throws If the given object is empty.
     *
     * @example
     * faker.helpers.objectKey({ myProperty: 'myValue' }) // 'myProperty'
     *
     * @since 6.3.0
     */
    objectKey<const T extends Record<string, unknown>>(object: T): keyof T;
    /**
     * Returns a random value from given object.
     *
     * @template T The type of object to select from.
     *
     * @param object The object to be used.
     *
     * @throws If the given object is empty.
     *
     * @example
     * faker.helpers.objectValue({ myProperty: 'myValue' }) // 'myValue'
     *
     * @since 6.3.0
     */
    objectValue<const T extends Record<string, unknown>>(object: T): T[keyof T];
    /**
     * Returns a random `[key, value]` pair from the given object.
     *
     * @template T The type of the object to select from.
     *
     * @param object The object to be used.
     *
     * @throws If the given object is empty.
     *
     * @example
     * faker.helpers.objectEntry({ prop1: 'value1', prop2: 'value2' }) // ['prop1', 'value1']
     *
     * @since 8.0.0
     */
    objectEntry<const T extends Record<string, unknown>>(object: T): [keyof T, T[keyof T]];
    /**
     * Returns random element from the given array.
     *
     * @template T The type of the elements to pick from.
     *
     * @param array The array to pick the value from.
     *
     * @throws If the given array is empty.
     *
     * @example
     * faker.helpers.arrayElement(['cat', 'dog', 'mouse']) // 'dog'
     *
     * @since 6.3.0
     */
    arrayElement<const T>(array: ReadonlyArray<T>): T;
    /**
     * Returns a weighted random element from the given array. Each element of the array should be an object with two keys `weight` and `value`.
     *
     * - Each `weight` key should be a number representing the probability of selecting the value, relative to the sum of the weights. Weights can be any positive float or integer.
     * - Each `value` key should be the corresponding value.
     *
     * For example, if there are two values A and B, with weights 1 and 2 respectively, then the probability of picking A is 1/3 and the probability of picking B is 2/3.
     *
     * @template T The type of the elements to pick from.
     *
     * @param array Array to pick the value from.
     * @param array[].weight The weight of the value.
     * @param array[].value The value to pick.
     *
     * @example
     * faker.helpers.weightedArrayElement([{ weight: 5, value: 'sunny' }, { weight: 4, value: 'rainy' }, { weight: 1, value: 'snowy' }]) // 'sunny', 50% of the time, 'rainy' 40% of the time, 'snowy' 10% of the time
     *
     * @since 8.0.0
     */
    weightedArrayElement<const T>(array: ReadonlyArray<{
        /**
         * The weight of the value.
         */
        weight: number;
        /**
         * The value to pick.
         */
        value: T;
    }>): T;
    /**
     * Returns a subset with random elements of the given array in random order.
     *
     * @template T The type of the elements to pick from.
     *
     * @param array Array to pick the value from.
     * @param count Number or range of elements to pick.
     *    When not provided, random number of elements will be picked.
     *    When value exceeds array boundaries, it will be limited to stay inside.
     *
     * @example
     * faker.helpers.arrayElements(['cat', 'dog', 'mouse']) // ['mouse', 'cat']
     * faker.helpers.arrayElements([1, 2, 3, 4, 5], 2) // [4, 2]
     * faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 2, max: 4 }) // [3, 5, 1]
     *
     * @since 6.3.0
     */
    arrayElements<const T>(array: ReadonlyArray<T>, count?: number | {
        /**
         * The minimum number of elements to pick.
         */
        min: number;
        /**
         * The maximum number of elements to pick.
         */
        max: number;
    }): T[];
    /**
     * Returns a random value from an Enum object.
     *
     * This does the same as `objectValue` except that it ignores (the values assigned to) the numeric keys added for TypeScript enums.
     *
     * @template T Type of generic enums, automatically inferred by TypeScript.
     *
     * @param enumObject Enum to pick the value from.
     *
     * @example
     * enum Color { Red, Green, Blue }
     * faker.helpers.enumValue(Color) // 1 (Green)
     *
     * enum Direction { North = 'North', South = 'South'}
     * faker.helpers.enumValue(Direction) // 'South'
     *
     * enum HttpStatus { Ok = 200, Created = 201, BadRequest = 400, Unauthorized = 401 }
     * faker.helpers.enumValue(HttpStatus) // 200 (Ok)
     *
     * @since 8.0.0
     */
    enumValue<T extends Record<string | number, string | number>>(enumObject: T): T[keyof T];
    /**
     * Helper method that converts the given number or range to a number.
     *
     * @param numberOrRange The number or range to convert.
     * @param numberOrRange.min The minimum value for the range.
     * @param numberOrRange.max The maximum value for the range.
     *
     * @example
     * faker.helpers.rangeToNumber(1) // 1
     * faker.helpers.rangeToNumber({ min: 1, max: 10 }) // 5
     *
     * @since 8.0.0
     */
    rangeToNumber(numberOrRange: number | {
        /**
         * The minimum value for the range.
         */
        min: number;
        /**
         * The maximum value for the range.
         */
        max: number;
    }): number;
    /**
     * Generates an array containing values returned by the given method.
     *
     * @template TResult The type of elements.
     *
     * @param method The method used to generate the values.
     * The method will be called with `(_, index)`, to allow using the index in the generated value e.g. as id.
     * @param options The optional options object.
     * @param options.count The number or range of elements to generate. Defaults to `3`.
     *
     * @example
     * faker.helpers.multiple(() => faker.person.firstName()) // [ 'Aniya', 'Norval', 'Dallin' ]
     * faker.helpers.multiple(() => faker.person.firstName(), { count: 3 }) // [ 'Santos', 'Lavinia', 'Lavinia' ]
     * faker.helpers.multiple((_, i) => `${faker.color.human()}-${i + 1}`) // [ 'orange-1', 'orchid-2', 'sky blue-3' ]
     *
     * @since 8.0.0
     */
    multiple<const TResult>(method: (v: unknown, index: number) => TResult, options?: {
        /**
         * The number or range of elements to generate.
         *
         * @default 3
         */
        count?: number | {
            /**
             * The minimum value for the range.
             */
            min: number;
            /**
             * The maximum value for the range.
             */
            max: number;
        };
    }): TResult[];
}
/**
 * Module with various helper methods providing basic (seed-dependent) operations useful for implementing faker methods.
 *
 * ### Overview
 *
 * A particularly helpful method is [`arrayElement()`](https://fakerjs.dev/api/helpers.html#arrayelement) which returns a random element from an array. This is useful when adding custom data that Faker doesn't contain.
 *
 * There are alternatives of this method for objects ([`objectKey()`](https://fakerjs.dev/api/helpers.html#objectkey) and [`objectValue()`](https://fakerjs.dev/api/helpers.html#objectvalue)) and enums ([`enumValue()`](https://fakerjs.dev/api/helpers.html#enumvalue)). You can also return multiple elements ([`arrayElements()`](https://fakerjs.dev/api/helpers.html#arrayelements)) or elements according to a weighting ([`weightedArrayElement()`](https://fakerjs.dev/api/helpers.html#weightedarrayelement)).
 *
 * A number of methods can generate strings according to various patterns: [`replaceSymbols()`](https://fakerjs.dev/api/helpers.html#replacesymbols) and [`fromRegExp()`](https://fakerjs.dev/api/helpers.html#fromregexp).
 */
declare class HelpersModule extends SimpleHelpersModule {
    protected readonly faker: Faker;
    constructor(faker: Faker);
    /**
     * Generator for combining faker methods based on a static string input.
     *
     * Note: We recommend using string template literals instead of `fake()`,
     * which are faster and strongly typed (if you are using TypeScript),
     * e.g. ``const address = `${faker.location.zipCode()} ${faker.location.city()}`;``
     *
     * This method is useful if you have to build a random string from a static, non-executable source
     * (e.g. string coming from a user, stored in a database or a file).
     *
     * It checks the given string for placeholders and replaces them by calling faker methods:
     *
     * ```js
     * const hello = faker.helpers.fake('Hi, my name is {{person.firstName}} {{person.lastName}}!');
     * ```
     *
     * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
     *
     * It is also possible to provide parameters. At first, they will be parsed as json,
     * and if that isn't possible, we will fall back to string:
     *
     * ```js
     * const message = faker.helpers.fake('You can call me at {{phone.number(+!# !## #### #####!)}}.');
     * ```
     *
     * It is also possible to use multiple parameters (comma separated).
     *
     * ```js
     * const message = faker.helpers.fake('Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.');
     * ```
     *
     * It is also NOT possible to use any non-faker methods or plain javascript in such patterns.
     *
     * @param pattern The pattern string that will get interpolated.
     *
     * @see faker.helpers.mustache(): For using custom functions to resolve templates.
     *
     * @example
     * faker.helpers.fake('{{person.lastName}}') // 'Barrows'
     * faker.helpers.fake('{{person.lastName}}, {{person.firstName}} {{person.suffix}}') // 'Durgan, Noe MD'
     * faker.helpers.fake('This is static test.') // 'This is static test.'
     * faker.helpers.fake('Good Morning {{person.firstName}}!') // 'Good Morning Estelle!'
     * faker.helpers.fake('You can visit me at {{location.streetAddress(true)}}.') // 'You can visit me at 3393 Ronny Way Apt. 742.'
     * faker.helpers.fake('I flipped the coin and got: {{helpers.arrayElement(["heads", "tails"])}}') // 'I flipped the coin and got: tails'
     * faker.helpers.fake('Your PIN number is: {{string.numeric(4, {"exclude": ["0"]})}}') // 'Your PIN number is: 4834'
     *
     * @since 7.4.0
     */
    fake(pattern: string): string;
    /**
     * Generator for combining faker methods based on an array containing static string inputs.
     *
     * Note: We recommend using string template literals instead of `fake()`,
     * which are faster and strongly typed (if you are using TypeScript),
     * e.g. ``const address = `${faker.location.zipCode()} ${faker.location.city()}`;``
     *
     * This method is useful if you have to build a random string from a static, non-executable source
     * (e.g. string coming from a user, stored in a database or a file).
     *
     * It checks the given string for placeholders and replaces them by calling faker methods:
     *
     * ```js
     * const hello = faker.helpers.fake(['Hi, my name is {{person.firstName}} {{person.lastName}}!']);
     * ```
     *
     * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
     *
     * It is also possible to provide parameters. At first, they will be parsed as json,
     * and if that isn't possible, it will fall back to string:
     *
     * ```js
     * const message = faker.helpers.fake([
     *   'You can call me at {{phone.number(+!# !## #### #####!)}}.',
     *   'My email is {{internet.email}}.',
     * ]);
     * ```
     *
     * It is also possible to use multiple parameters (comma separated).
     *
     * ```js
     * const message = faker.helpers.fake(['Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.']);
     * ```
     *
     * It is also NOT possible to use any non-faker methods or plain javascript in such patterns.
     *
     * @param patterns The array to select a pattern from, that will then get interpolated. Must not be empty.
     *
     * @see faker.helpers.mustache(): For using custom functions to resolve templates.
     *
     * @example
     * faker.helpers.fake(['A: {{person.firstName}}', 'B: {{person.lastName}}']) // 'A: Barry'
     *
     * @since 8.0.0
     */
    fake(patterns: ReadonlyArray<string>): string;
    /**
     * Generator for combining faker methods based on a static string input or an array of static string inputs.
     *
     * Note: We recommend using string template literals instead of `fake()`,
     * which are faster and strongly typed (if you are using TypeScript),
     * e.g. ``const address = `${faker.location.zipCode()} ${faker.location.city()}`;``
     *
     * This method is useful if you have to build a random string from a static, non-executable source
     * (e.g. string coming from a user, stored in a database or a file).
     *
     * It checks the given string for placeholders and replaces them by calling faker methods:
     *
     * ```js
     * const hello = faker.helpers.fake('Hi, my name is {{person.firstName}} {{person.lastName}}!');
     * ```
     *
     * This would use the `faker.person.firstName()` and `faker.person.lastName()` method to resolve the placeholders respectively.
     *
     * It is also possible to provide parameters. At first, they will be parsed as json,
     * and if that isn't possible, it will fall back to string:
     *
     * ```js
     * const message = faker.helpers.fake('You can call me at {{phone.number(+!# !## #### #####!)}}.');
     * ```
     *
     * It is also possible to use multiple parameters (comma separated).
     *
     * ```js
     * const message = faker.helpers.fake('Your pin is {{string.numeric(4, {"allowLeadingZeros": true})}}.');
     * ```
     *
     * It is also NOT possible to use any non-faker methods or plain javascript in such patterns.
     *
     * @param pattern The pattern string that will get interpolated. If an array is passed, a random element will be picked and interpolated.
     *
     * @see faker.helpers.mustache(): For using custom functions to resolve templates.
     *
     * @example
     * faker.helpers.fake('{{person.lastName}}') // 'Barrows'
     * faker.helpers.fake('{{person.lastName}}, {{person.firstName}} {{person.suffix}}') // 'Durgan, Noe MD'
     * faker.helpers.fake('This is static test.') // 'This is static test.'
     * faker.helpers.fake('Good Morning {{person.firstName}}!') // 'Good Morning Estelle!'
     * faker.helpers.fake('You can visit me at {{location.streetAddress(true)}}.') // 'You can visit me at 3393 Ronny Way Apt. 742.'
     * faker.helpers.fake('I flipped the coin and got: {{helpers.arrayElement(["heads", "tails"])}}') // 'I flipped the coin and got: tails'
     * faker.helpers.fake(['A: {{person.firstName}}', 'B: {{person.lastName}}']) // 'A: Barry'
     *
     * @since 7.4.0
     */
    fake(pattern: string | ReadonlyArray<string>): string;
}

/**
 * Module to generate images.
 *
 * ### Overview
 *
 * For a random image, use [`url()`](https://fakerjs.dev/api/image.html#url). This will not return the image directly but a URL pointing to an image from one of two demo image providers "Picsum" and "LoremFlickr". You can request an image specifically from one of two providers using [`urlLoremFlickr()`](https://fakerjs.dev/api/image.html#urlloremflickr) or [`urlPicsumPhotos()`](https://fakerjs.dev/api/image.html#urlpicsumphotos).
 *
 * For a random placeholder image containing only solid color and text, use [`urlPlaceholder()`](https://fakerjs.dev/api/image.html#urlplaceholder) (uses a third-party service) or [`dataUri()`](https://fakerjs.dev/api/image.html#datauri) (returns a SVG string).
 *
 * For a random user avatar image, use [`avatar()`](https://fakerjs.dev/api/image.html#avatar).
 *
 * This module previously also contained methods for specifically themed images like "fashion" or "food", but these are now deprecated. If you need more control over image type, you can request categorized images using [`urlLoremFlickr()`](https://fakerjs.dev/api/image.html#urlloremflickr), use an image provider directly or provide your own set of placeholder images.
 */
declare class ImageModule extends ModuleBase {
    /**
     * Generates a random avatar image url.
     *
     * @example
     * faker.image.avatar()
     * // 'https://avatars.githubusercontent.com/u/97165289'
     *
     * @since 2.0.1
     */
    avatar(): string;
    /**
     * Generates a random avatar from GitHub.
     *
     * @example
     * faker.image.avatarGitHub()
     * // 'https://avatars.githubusercontent.com/u/97165289'
     *
     * @since 8.0.0
     */
    avatarGitHub(): string;
    /**
     * Generates a random avatar from `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar`.
     *
     * @example
     * faker.image.avatarLegacy()
     * // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg'
     *
     * @since 8.0.0
     */
    avatarLegacy(): string;
    /**
     * Generates a random image url.
     *
     * @param options Options for generating a URL for an image.
     * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
     * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
     *
     * @example
     * faker.image.url() // 'https://loremflickr.com/640/480?lock=1234'
     *
     * @since 8.0.0
     */
    url(options?: {
        /**
         * The width of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        width?: number;
        /**
         * The height of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        height?: number;
    }): string;
    /**
     * Generates a random image url provided via https://loremflickr.com.
     *
     * @param options Options for generating a URL for an image.
     * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
     * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
     * @param options.category Category to use for the image.
     *
     * @example
     * faker.image.urlLoremFlickr() // 'https://loremflickr.com/640/480?lock=1234'
     * faker.image.urlLoremFlickr({ width: 128 }) // 'https://loremflickr.com/128/480?lock=1234'
     * faker.image.urlLoremFlickr({ height: 128 }) // 'https://loremflickr.com/640/128?lock=1234'
     * faker.image.urlLoremFlickr({ category: 'nature' }) // 'https://loremflickr.com/640/480/nature?lock=1234'
     *
     * @since 8.0.0
     */
    urlLoremFlickr(options?: {
        /**
         * The width of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        width?: number;
        /**
         * The height of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        height?: number;
        /**
         * Category to use for the image.
         */
        category?: string;
    }): string;
    /**
     * Generates a random image url provided via https://picsum.photos.
     *
     * @param options Options for generating a URL for an image.
     * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
     * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
     * @param options.grayscale Whether the image should be grayscale. Defaults to a random boolean value.
     * @param options.blur Whether the image should be blurred. `0` disables the blur. Defaults to a random integer between `0` and `10`.
     *
     * @example
     * faker.image.urlPicsumPhotos() // 'https://picsum.photos/seed/NWbJM2B/640/480'
     * faker.image.urlPicsumPhotos({ width: 128 }) // 'https://picsum.photos/seed/NWbJM2B/128/480'
     * faker.image.urlPicsumPhotos({ height: 128 }) // 'https://picsum.photos/seed/NWbJM2B/640/128'
     * faker.image.urlPicsumPhotos({ grayscale: true }) // 'https://picsum.photos/seed/NWbJM2B/640/480?grayscale'
     * faker.image.urlPicsumPhotos({ blur: 4 }) // 'https://picsum.photos/seed/NWbJM2B/640/480?blur=4'
     * faker.image.urlPicsumPhotos({ blur: 4, grayscale: true }) // 'https://picsum.photos/seed/NWbJM2B/640/480?grayscale&blur=4'
     *
     * @since 8.0.0
     */
    urlPicsumPhotos(options?: {
        /**
         * The width of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        width?: number;
        /**
         * The height of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        height?: number;
        /**
         * Whether the image should be grayscale.
         *
         * @default faker.datatype.boolean()
         */
        grayscale?: boolean;
        /**
         * Whether the image should be blurred. `0` disables the blur.
         *
         * @default faker.number.int({ max: 10 })
         */
        blur?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    }): string;
    /**
     * Generates a random image url provided via https://via.placeholder.com/.
     *
     * @param options Options for generating a URL for an image.
     * @param options.width The width of the image. Defaults to a random number between 1 and 3999.
     * @param options.height The height of the image. Defaults to a random number between 1 and 3999.
     * @param options.backgroundColor The background color of the image. Defaults to a random hex color.
     * @param options.textColor The text color of the image. Defaults to a random hex color.
     * @param options.format The format of the image. Defaults to a random format.
     * @param options.text The text to display on the image. Defaults to a random string.
     *
     * @example
     * faker.image.urlPlaceholder() // 'https://via.placeholder.com/150x180/FF0000/FFFFFF.webp?text=lorem'
     * faker.image.urlPlaceholder({ width: 128 }) // 'https://via.placeholder.com/128x180/FF0000/FFFFFF.webp?text=lorem'
     * faker.image.urlPlaceholder({ height: 128 }) // 'https://via.placeholder.com/150x128/FF0000/FFFFFF.webp?text=lorem'
     * faker.image.urlPlaceholder({ backgroundColor: '000000' }) // 'https://via.placeholder.com/150x180/000000/FFFFFF.webp?text=lorem'
     * faker.image.urlPlaceholder({ textColor: '000000' }) // 'https://via.placeholder.com/150x180/FF0000/000000.webp?text=lorem'
     * faker.image.urlPlaceholder({ format: 'png' }) // 'https://via.placeholder.com/150x180/FF0000/FFFFFF.png?text=lorem'
     * faker.image.urlPlaceholder({ text: 'lorem ipsum' }) // 'https://via.placeholder.com/150x180/FF0000/FFFFFF.webp?text=lorem+ipsum'
     * faker.image.urlPlaceholder({ width: 128, height: 128, backgroundColor: '000000', textColor: 'FF0000', format: 'png', text: 'lorem ipsum' }) // 'https://via.placeholder.com/128x128/000000/FF0000.png?text=lorem+ipsum'
     *
     * @since 8.0.0
     */
    urlPlaceholder(options?: {
        /**
         * The width of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        width?: number;
        /**
         * The height of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        height?: number;
        /**
         * The background color of the image.
         *
         * @default faker.color.rgb({ format: 'hex', prefix: '' })
         */
        backgroundColor?: string;
        /**
         * The text color of the image.
         *
         * @default faker.color.rgb({ format: 'hex', prefix: '' })
         */
        textColor?: string;
        /**
         * The format of the image.
         *
         * @default faker.helpers.arrayElement(['gif', 'jpeg', 'jpg', 'png', 'webp'])
         */
        format?: 'gif' | 'jpeg' | 'jpg' | 'png' | 'webp';
        /**
         * The text to display on the image.
         *
         * @default faker.lorem.words()
         */
        text?: string;
    }): string;
    /**
     * Generates a random data uri containing an URL-encoded SVG image or a Base64-encoded SVG image.
     *
     * @param options Options for generating a data uri.
     * @param options.width The width of the image. Defaults to a random integer between `1` and `3999`.
     * @param options.height The height of the image. Defaults to a random integer between `1` and `3999`.
     * @param options.color The color of the image. Must be a color supported by svg. Defaults to a random color.
     * @param options.type The type of the image. Defaults to a random type.
     *
     * @example
     * faker.image.dataUri() // 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http...'
     * faker.image.dataUri({ type: 'svg-base64' }) // 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3...'
     *
     * @since 4.0.0
     */
    dataUri(options?: {
        /**
         * The width of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        width?: number;
        /**
         * The height of the image.
         *
         * @default faker.number.int({ min: 1, max: 3999 })
         */
        height?: number;
        /**
         * The color of the image. Must be a color supported by svg.
         *
         * @default faker.color.rgb()
         */
        color?: string;
        /**
         * The type of the image to return. Consisting of
         * the file extension and the used encoding.
         *
         * @default faker.helpers.arrayElements(['svg-uri', 'svg-base64'])
         */
        type?: 'svg-uri' | 'svg-base64';
    }): string;
}

/**
 * Module to generate addresses and locations. Prior to Faker 8.0.0, this module was known as `faker.address`.
 *
 * ### Overview
 *
 * For a typical street address for a locale, use [`streetAddress()`](https://fakerjs.dev/api/location.html#streetaddress), [`city()`](https://fakerjs.dev/api/location.html#city), [`state()`](https://fakerjs.dev/api/location.html#state)), and [`zipCode()`](https://fakerjs.dev/api/location.html#zipcode). Most locales provide localized versions for a specific country.
 *
 * If you need latitude and longitude coordinates, use [`latitude()`](https://fakerjs.dev/api/location.html#latitude) and [`longitude()`](https://fakerjs.dev/api/location.html#longitude), or [`nearbyGPSCoordinate()`](https://fakerjs.dev/api/location.html#nearbygpscoordinate) for a latitude/longitude near a given location.
 *
 * For a random country, you can use [`country()`](https://fakerjs.dev/api/location.html#country) or [`countryCode()`](https://fakerjs.dev/api/location.html#countrycode).
 */
declare class LocationModule extends ModuleBase {
    /**
     * Generates random zip code from specified format. If format is not specified,
     * the locale's zip format is used.
     *
     * @param options The format used to generate the zip code or an options object.
     * @param options.state The state to generate the zip code for.
     * If the current locale does not have a corresponding `postcode_by_state` definition, an error is thrown.
     * @param options.format The optional format used to generate the zip code.
     * By default, a random format is used from the locale zip formats.
     * This won't be used if the state option is specified.
     *
     * @see faker.helpers.replaceSymbols(): For more information about how the pattern is used.
     *
     * @example
     * faker.location.zipCode() // '17839'
     * faker.location.zipCode('####') // '6925'
     *
     * @since 8.0.0
     */
    zipCode(options?: string | {
        /**
         * The state to generate the zip code for.
         *
         * If the current locale does not have a corresponding `postcode_by_state` definition, an error is thrown.
         */
        state?: string;
        /**
         * The optional format used to generate the zip code.
         *
         * This won't be used if the state option is specified.
         *
         * @default faker.definitions.location.postcode
         */
        format?: string;
    }): string;
    /**
     * Generates a random localized city name.
     *
     * @example
     * faker.location.city() // 'East Jarretmouth'
     * fakerDE.location.city() // 'Bad Lilianadorf'
     *
     * @since 8.0.0
     */
    city(): string;
    /**
     * Generates a random building number.
     *
     * @example
     * faker.location.buildingNumber() // '379'
     *
     * @since 8.0.0
     */
    buildingNumber(): string;
    /**
     * Generates a random localized street name.
     *
     * @example
     * faker.location.street() // 'Schroeder Isle'
     *
     * @since 8.0.0
     */
    street(): string;
    /**
     * Generates a random localized street address.
     *
     * @param options Whether to use a full address or an options object.
     * @param options.useFullAddress When true this will generate a full address.
     * Otherwise it will just generate a street address.
     *
     * @example
     * faker.location.streetAddress() // '0917 O'Conner Estates'
     * faker.location.streetAddress(false) // '34830 Erdman Hollow'
     * faker.location.streetAddress(true) // '3393 Ronny Way Apt. 742'
     * faker.location.streetAddress({ useFullAddress: true }) // '7917 Miller Park Apt. 410'
     *
     * @since 8.0.0
     */
    streetAddress(options?: boolean | {
        /**
         * When true this will generate a full address.
         * Otherwise it will just generate a street address.
         */
        useFullAddress?: boolean;
    }): string;
    /**
     * Generates a random localized secondary address. This refers to a specific location at a given address
     * such as an apartment or room number.
     *
     * @example
     * faker.location.secondaryAddress() // 'Apt. 861'
     *
     * @since 8.0.0
     */
    secondaryAddress(): string;
    /**
     * Returns a random localized county, or other equivalent second-level administrative entity for the locale's country such as a district or department.
     *
     * @example
     * fakerEN_GB.location.county() // 'Cambridgeshire'
     * fakerEN_US.location.county() // 'Monroe County'
     *
     * @since 8.0.0
     */
    county(): string;
    /**
     * Returns a random country name.
     *
     * @example
     * faker.location.country() // 'Greece'
     *
     * @since 8.0.0
     */
    country(): string;
    /**
     * Returns a random [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code.
     *
     * @param options The code to return or an options object.
     * @param options.variant The variant to return. Can be one of:
     *
     * - `'alpha-2'` (two-letter code)
     * - `'alpha-3'` (three-letter code)
     * - `'numeric'` (numeric code)
     *
     * Defaults to `'alpha-2'`.
     *
     * @example
     * faker.location.countryCode() // 'SJ'
     * faker.location.countryCode('alpha-2') // 'GA'
     * faker.location.countryCode('alpha-3') // 'TJK'
     * faker.location.countryCode('numeric') // '528'
     *
     * @since 8.0.0
     */
    countryCode(options?: 'alpha-2' | 'alpha-3' | 'numeric' | {
        /**
         * The code to return.
         * Can be either `'alpha-2'` (two-letter code),
         * `'alpha-3'` (three-letter code)
         * or `'numeric'` (numeric code).
         *
         * @default 'alpha-2'
         */
        variant?: 'alpha-2' | 'alpha-3' | 'numeric';
    }): string;
    /**
     * Returns a random localized state, or other equivalent first-level administrative entity for the locale's country such as a province or region.
     * Generally, these are the ISO 3166-2 subdivisions for a country.
     * If a locale doesn't correspond to one specific country, the method may return ISO 3166-2 subdivisions from one or more countries that uses that language. For example, the `ar` locale includes subdivisions from Arabic-speaking countries, such as Tunisia, Algeria, Syria, Lebanon, etc.
     * For historical compatibility reasons, the default `en` locale only includes states in the United States (identical to `en_US`). However, you can use other English locales, such as `en_IN`, `en_GB`, and `en_AU`, if needed.
     *
     * @param options An options object.
     * @param options.abbreviated If true this will return abbreviated first-level administrative entity names.
     * Otherwise this will return the long name. Defaults to `false`.
     *
     * @example
     * faker.location.state() // 'Mississippi'
     * fakerEN_CA.location.state() // 'Saskatchewan'
     * fakerDE.location.state() // 'Nordrhein-Westfalen'
     * faker.location.state({ abbreviated: true }) // 'LA'
     *
     * @since 8.0.0
     */
    state(options?: {
        /**
         * If true this will return abbreviated first-level administrative entity names.
         * Otherwise this will return the long name.
         *
         * @default false
         */
        abbreviated?: boolean;
    }): string;
    /**
     * Generates a random latitude.
     *
     * @param options An options object.
     * @param options.max The upper bound for the latitude to generate. Defaults to `90`.
     * @param options.min The lower bound for the latitude to generate. Defaults to `-90`.
     * @param options.precision The number of decimal points of precision for the latitude. Defaults to `4`.
     *
     * @example
     * faker.location.latitude() // -30.9501
     * faker.location.latitude({ max: 10 }) // 5.7225
     * faker.location.latitude({ max: 10, min: -10 }) // -9.6273
     * faker.location.latitude({ max: 10, min: -10, precision: 5 }) // 2.68452
     *
     * @since 8.0.0
     */
    latitude(options?: {
        /**
         * The upper bound for the latitude to generate.
         *
         * @default 90
         */
        max?: number;
        /**
         * The lower bound for the latitude to generate.
         *
         * @default -90
         */
        min?: number;
        /**
         * The number of decimal points of precision for the latitude.
         *
         * @default 4
         */
        precision?: number;
    }): number;
    /**
     * Generates a random longitude.
     *
     * @param options An options object.
     * @param options.max The upper bound for the longitude to generate. Defaults to `180`.
     * @param options.min The lower bound for the longitude to generate. Defaults to `-180`.
     * @param options.precision The number of decimal points of precision for the longitude. Defaults to `4`.
     *
     * @example
     * faker.location.longitude() // -30.9501
     * faker.location.longitude({ max: 10 }) // 5.7225
     * faker.location.longitude({ max: 10, min: -10 }) // -9.6273
     * faker.location.longitude({ max: 10, min: -10, precision: 5 }) // 2.68452
     *
     * @since 8.0.0
     */
    longitude(options?: {
        /**
         * The upper bound for the longitude to generate.
         *
         * @default 180
         */
        max?: number;
        /**
         * The lower bound for the longitude to generate.
         *
         * @default -180
         */
        min?: number;
        /**
         * The number of decimal points of precision for the longitude.
         *
         * @default 4
         */
        precision?: number;
    }): number;
    /**
     * Returns a random direction (cardinal and ordinal; northwest, east, etc).
     *
     * @param options The options to use.
     * @param options.abbreviated If true this will return abbreviated directions (NW, E, etc).
     * Otherwise this will return the long name. Defaults to `false`.
     *
     * @example
     * faker.location.direction() // 'Northeast'
     * faker.location.direction({ abbreviated: true }) // 'SW'
     *
     * @since 8.0.0
     */
    direction(options?: {
        /**
         * If true this will return abbreviated directions (NW, E, etc).
         * Otherwise this will return the long name.
         *
         * @default false
         */
        abbreviated?: boolean;
    }): string;
    /**
     * Returns a random cardinal direction (north, east, south, west).
     *
     * @param options The options to use.
     * @param options.abbreviated If true this will return abbreviated directions (N, E, etc).
     * Otherwise this will return the long name. Defaults to `false`.
     *
     * @example
     * faker.location.cardinalDirection() // 'North'
     * faker.location.cardinalDirection({ abbreviated: true }) // 'W'
     *
     * @since 8.0.0
     */
    cardinalDirection(options?: {
        /**
         * If true this will return abbreviated directions (N, E, etc).
         * Otherwise this will return the long name.
         *
         * @default false
         */
        abbreviated?: boolean;
    }): string;
    /**
     * Returns a random ordinal direction (northwest, southeast, etc).
     *
     * @param options Whether to use abbreviated or an options object.
     * @param options.abbreviated If true this will return abbreviated directions (NW, SE, etc).
     * Otherwise this will return the long name. Defaults to `false`.
     *
     * @example
     * faker.location.ordinalDirection() // 'Northeast'
     * faker.location.ordinalDirection({ abbreviated: true }) // 'SW'
     *
     * @since 8.0.0
     */
    ordinalDirection(options?: {
        /**
         * If true this will return abbreviated directions (NW, SE, etc).
         * Otherwise this will return the long name.
         *
         * @default false
         */
        abbreviated?: boolean;
    }): string;
    /**
     * Generates a random GPS coordinate within the specified radius from the given coordinate.
     *
     * @param options The options for generating a GPS coordinate.
     * @param options.origin The original coordinate to get a new coordinate close to.
     * If no coordinate is given, a random one will be chosen.
     * @param options.radius The maximum distance from the given coordinate to the new coordinate. Defaults to `10`.
     * @param options.isMetric If `true` assume the radius to be in kilometers. If `false` for miles. Defaults to `false`.
     *
     * @example
     * faker.location.nearbyGPSCoordinate() // [ 33.8475, -170.5953 ]
     * faker.location.nearbyGPSCoordinate({ origin: [33, -170] }) // [ 33.0165, -170.0636 ]
     * faker.location.nearbyGPSCoordinate({ origin: [33, -170], radius: 1000, isMetric: true }) // [ 37.9163, -179.2408 ]
     *
     * @since 8.0.0
     */
    nearbyGPSCoordinate(options?: {
        /**
         * The original coordinate to get a new coordinate close to.
         */
        origin?: [latitude: number, longitude: number];
        /**
         * The maximum distance from the given coordinate to the new coordinate.
         *
         * @default 10
         */
        radius?: number;
        /**
         * If `true` assume the radius to be in kilometers. If `false` for miles.
         *
         * @default false
         */
        isMetric?: boolean;
    }): [latitude: number, longitude: number];
    /**
     * Returns a random IANA time zone relevant to this locale.
     *
     * The returned time zone is tied to the current locale.
     *
     * @see [IANA Time Zone Database](https://www.iana.org/time-zones)
     * @see faker.date.timeZone(): For generating a random time zone from all available time zones.
     *
     * @example
     * faker.location.timeZone() // 'Pacific/Guam'
     *
     * @since 8.0.0
     */
    timeZone(): string;
}

/**
 * Module to generate random texts and words.
 *
 * ### Overview
 *
 * Generate dummy content using traditional faux-Latin [lorem ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum) (in other locales to `en`, alternative words may be used).
 *
 * In order of increasing size you can generate a single [`word()`](https://fakerjs.dev/api/lorem.html#word), multiple [`words()`](https://fakerjs.dev/api/lorem.html#words), a [`sentence()`](https://fakerjs.dev/api/lorem.html#sentence), multiple [`sentences()`](https://fakerjs.dev/api/lorem.html#sentences), [`lines()`](https://fakerjs.dev/api/lorem.html#lines) separated by newlines, one [`paragraph()`](https://fakerjs.dev/api/lorem.html#paragraph), or multiple [`paragraphs()`](https://fakerjs.dev/api/lorem.html#paragraphs).
 *
 * The generic [`text()`](https://fakerjs.dev/api/lorem.html#text) method can be used to generate some text between one sentence and multiple paragraphs, while [`slug()`](https://fakerjs.dev/api/lorem.html#slug) generates an URL-friendly hyphenated string.
 */
declare class LoremModule extends ModuleBase {
    /**
     * Generates a word of a specified length.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.lorem.word() // 'temporibus'
     * faker.lorem.word(5) // 'velit'
     * faker.lorem.word({ strategy: 'shortest' }) // 'a'
     * faker.lorem.word({ length: { min: 5, max: 7 }, strategy: 'fail' }) // 'quaerat'
     *
     * @since 3.1.0
     */
    word(options?: number | {
        /**
         * The expected length of the word.
         *
         * @default 1
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Generates a space separated list of words.
     *
     * @param wordCount The number of words to generate. Defaults to `3`.
     * @param wordCount.min The minimum number of words to generate.
     * @param wordCount.max The maximum number of words to generate.
     *
     * @example
     * faker.lorem.words() // 'qui praesentium pariatur'
     * faker.lorem.words(10) // 'debitis consectetur voluptatem non doloremque ipsum autem totam eum ratione'
     * faker.lorem.words({ min: 1, max: 3 }) // 'tenetur error cum'
     *
     * @since 2.0.1
     */
    words(wordCount?: number | {
        /**
         * The minimum number of words to generate.
         */
        min: number;
        /**
         * The maximum number of words to generate.
         */
        max: number;
    }): string;
    /**
     * Generates a space separated list of words beginning with a capital letter and ending with a period.
     *
     * @param wordCount The number of words, that should be in the sentence. Defaults to a random number between `3` and `10`.
     * @param wordCount.min The minimum number of words to generate. Defaults to `3`.
     * @param wordCount.max The maximum number of words to generate. Defaults to `10`.
     *
     * @example
     * faker.lorem.sentence() // 'Voluptatum cupiditate suscipit autem eveniet aut dolorem aut officiis distinctio.'
     * faker.lorem.sentence(5) // 'Laborum voluptatem officiis est et.'
     * faker.lorem.sentence({ min: 3, max: 5 }) // 'Fugiat repellendus nisi.'
     *
     * @since 2.0.1
     */
    sentence(wordCount?: number | {
        /**
         * The minimum number of words to generate.
         */
        min: number;
        /**
         * The maximum number of words to generate.
         */
        max: number;
    }): string;
    /**
     * Generates a slugified text consisting of the given number of hyphen separated words.
     *
     * @param wordCount The number of words to generate. Defaults to `3`.
     * @param wordCount.min The minimum number of words to generate.
     * @param wordCount.max The maximum number of words to generate.
     *
     * @example
     * faker.lorem.slug() // 'dolores-illo-est'
     * faker.lorem.slug(5) // 'delectus-totam-iusto-itaque-placeat'
     * faker.lorem.slug({ min: 1, max: 3 }) // 'illo-ratione'
     *
     * @since 4.0.0
     */
    slug(wordCount?: number | {
        /**
         * The minimum number of words to generate.
         */
        min: number;
        /**
         * The maximum number of words to generate.
         */
        max: number;
    }): string;
    /**
     * Generates the given number of sentences.
     *
     * @param sentenceCount The number of sentences to generate. Defaults to a random number between `2` and `6`.
     * @param sentenceCount.min The minimum number of sentences to generate. Defaults to `2`.
     * @param sentenceCount.max The maximum number of sentences to generate. Defaults to `6`.
     * @param separator The separator to add between sentences. Defaults to `' '`.
     *
     * @example
     * faker.lorem.sentences() // 'Iste molestiae incidunt aliquam possimus reprehenderit eum corrupti. Deleniti modi voluptatem nostrum ut esse.'
     * faker.lorem.sentences(2) // 'Maxime vel numquam quibusdam. Dignissimos ex molestias quos aut molestiae quam nihil occaecati maiores.'
     * faker.lorem.sentences(2, '\n')
     * // 'Et rerum a unde tempora magnam sit nisi.
     * // Et perspiciatis ipsam omnis.'
     * faker.lorem.sentences({ min: 1, max: 3 }) // 'Placeat ex natus tenetur repellendus repellendus iste. Optio nostrum veritatis.'
     *
     * @since 2.0.1
     */
    sentences(sentenceCount?: number | {
        /**
         * The minimum number of sentences to generate.
         */
        min: number;
        /**
         * The maximum number of sentences to generate.
         */
        max: number;
    }, separator?: string): string;
    /**
     * Generates a paragraph with the given number of sentences.
     *
     * @param sentenceCount The number of sentences to generate. Defaults to `3`.
     * @param sentenceCount.min The minimum number of sentences to generate.
     * @param sentenceCount.max The maximum number of sentences to generate.
     *
     * @example
     * faker.lorem.paragraph() // 'Non architecto nam unde sint. Ex tenetur dolor facere optio aut consequatur. Ea laudantium reiciendis repellendus.'
     * faker.lorem.paragraph(2) // 'Animi possimus nemo consequuntur ut ea et tempore unde qui. Quis corporis esse occaecati.'
     * faker.lorem.paragraph({ min: 1, max: 3 }) // 'Quis doloribus necessitatibus sint. Rerum accusamus impedit corporis porro.'
     *
     * @since 2.0.1
     */
    paragraph(sentenceCount?: number | {
        /**
         * The minimum number of sentences to generate.
         */
        min: number;
        /**
         * The maximum number of sentences to generate.
         */
        max: number;
    }): string;
    /**
     * Generates the given number of paragraphs.
     *
     * @param paragraphCount The number of paragraphs to generate. Defaults to `3`.
     * @param paragraphCount.min The minimum number of paragraphs to generate.
     * @param paragraphCount.max The maximum number of paragraphs to generate.
     * @param separator The separator to use. Defaults to `'\n'`.
     *
     * @example
     * faker.lorem.paragraphs()
     * // 'Beatae voluptatem dicta et assumenda fugit eaque quidem consequatur. Fuga unde provident. Id reprehenderit soluta facilis est laborum laborum. Illum aut non ut. Est nulla rem ipsa.
     * // Voluptatibus quo pariatur est. Temporibus deleniti occaecati pariatur nemo est molestias voluptas. Doloribus commodi et et exercitationem vel et. Omnis inventore cum aut amet.
     * // Sapiente deleniti et. Ducimus maiores eum. Rem dolorem itaque aliquam.'
     *
     * faker.lorem.paragraphs(5)
     * // 'Quia hic sunt ducimus expedita quo impedit soluta. Quam impedit et ipsum optio. Unde dolores nulla nobis vero et aspernatur officiis.
     * // Aliquam dolorem temporibus dolores voluptatem voluptatem qui nostrum quia. Sit hic facilis rerum eius. Beatae doloribus nesciunt iste ipsum.
     * // Natus nam eum nulla voluptas molestiae fuga libero nihil voluptatibus. Sed quam numquam eum ipsam temporibus eaque ut et. Enim quas debitis quasi quis. Vitae et vitae.
     * // Repellat voluptatem est laborum illo harum sed reprehenderit aut. Quo sit et. Exercitationem blanditiis totam velit ad dicta placeat.
     * // Rerum non eum incidunt amet quo. Eaque laborum ut. Recusandae illo ab distinctio veritatis. Cum quis architecto ad maxime a.'
     *
     * faker.lorem.paragraphs(2, '<br/>\n')
     * // 'Eos magnam aut qui accusamus. Sapiente quas culpa totam excepturi. Blanditiis totam distinctio occaecati dignissimos cumque atque qui officiis.<br/>
     * // Nihil quis vel consequatur. Blanditiis commodi deserunt sunt animi dolorum. A optio porro hic dolorum fugit aut et sint voluptas. Minima ad sed ipsa est non dolores.'
     *
     * faker.lorem.paragraphs({ min: 1, max: 3 })
     * // 'Eum nam fugiat laudantium.
     * // Dignissimos tempore porro necessitatibus commodi nam.
     * // Veniam at commodi iste perferendis totam dolorum corporis ipsam.'
     *
     * @since 2.0.1
     */
    paragraphs(paragraphCount?: number | {
        /**
         * The minimum number of paragraphs to generate.
         */
        min: number;
        /**
         * The maximum number of paragraphs to generate.
         */
        max: number;
    }, separator?: string): string;
    /**
     * Generates a random text based on a random lorem method.
     *
     * @example
     * faker.lorem.text() // 'Doloribus autem non quis vero quia.'
     * faker.lorem.text()
     * // 'Rerum eum reiciendis id ipsa hic dolore aut laborum provident.
     * // Quis beatae quis corporis veritatis corrupti ratione delectus sapiente ut.
     * // Quis ut dolor dolores facilis possimus tempore voluptates.
     * // Iure nam officia optio cumque.
     * // Dolor tempora iusto.'
     *
     * @since 3.1.0
     */
    text(): string;
    /**
     * Generates the given number lines of lorem separated by `'\n'`.
     *
     * @param lineCount The number of lines to generate. Defaults to a random number between `1` and `5`.
     * @param lineCount.min The minimum number of lines to generate. Defaults to `1`.
     * @param lineCount.max The maximum number of lines to generate. Defaults to `5`.
     *
     * @example
     * faker.lorem.lines()
     * // 'Rerum quia aliquam pariatur explicabo sint minima eos.
     * // Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.
     * // Enim eveniet a qui.
     * // Consectetur velit eligendi animi nostrum veritatis.'
     *
     * faker.lorem.lines()
     * // 'Soluta deserunt eos quam reiciendis libero autem enim nam ut.
     * // Voluptate aut aut.'
     *
     * faker.lorem.lines(2)
     * // 'Quod quas nam quis impedit aut consequuntur.
     * // Animi dolores aspernatur.'
     *
     * faker.lorem.lines({ min: 1, max: 3 })
     * // 'Error dolorem natus quos eum consequatur necessitatibus.'
     *
     * @since 3.1.0
     */
    lines(lineCount?: number | {
        /**
         * The minimum number of lines to generate.
         */
        min: number;
        /**
         * The maximum number of lines to generate.
         */
        max: number;
    }): string;
}

declare enum Sex {
    Female = "female",
    Male = "male"
}
type SexType = `${Sex}`;
/**
 * Module to generate people's personal information such as names and job titles. Prior to Faker 8.0.0, this module was known as `faker.name`.
 *
 * ### Overview
 *
 * To generate a full name, use [`fullName`](https://fakerjs.dev/api/person.html#fullname). Note that this is not the same as simply concatenating [`firstName`](https://fakerjs.dev/api/person.html#firstname) and [`lastName`](https://fakerjs.dev/api/person.html#lastname), as the full name may contain a prefix, suffix, or both. Additionally, different supported locales will have differing name patterns. For example, the last name may appear before the first name, or there may be a double or hyphenated first or last name.
 *
 * You can also generate the parts of a name separately, using [`prefix`](https://fakerjs.dev/api/person.html#prefix), [`firstName`](https://fakerjs.dev/api/person.html#firstname), [`middleName`](https://fakerjs.dev/api/person.html#middlename), [`lastName`](https://fakerjs.dev/api/person.html#lastname), and [`suffix`](https://fakerjs.dev/api/person.html#suffix). Not all locales support all of these parts.
 *
 * Many of the methods in this module can optionally choose either female, male or mixed names.
 *
 * Job-related data is also available. To generate a job title, use [`jobTitle`](https://fakerjs.dev/api/person.html#jobtitle).
 *
 * This module can also generate other personal information which might appear in user profiles, such as [`gender`](https://fakerjs.dev/api/person.html#gender), [`zodiacSign`](https://fakerjs.dev/api/person.html#zodiacsign), and [`bio`](https://fakerjs.dev/api/person.html#bio).
 *
 * ### Related modules
 *
 * For personal contact information like phone numbers and email addresses, see the [`faker.phone`](https://fakerjs.dev/api/phone.html) and [`faker.internet`](https://fakerjs.dev/api/internet.html) modules.
 */
declare class PersonModule extends ModuleBase {
    /**
     * Returns a random first name.
     *
     * @param sex The optional sex to use.
     * Can be either `'female'` or `'male'`.
     *
     * @example
     * faker.person.firstName() // 'Antwan'
     * faker.person.firstName('female') // 'Victoria'
     * faker.person.firstName('male') // 'Tom'
     *
     * @since 8.0.0
     */
    firstName(sex?: SexType): string;
    /**
     * Returns a random last name.
     *
     * @param sex The optional sex to use.
     * Can be either `'female'` or `'male'`.
     *
     * @example
     * faker.person.lastName() // 'Hauck'
     * faker.person.lastName('female') // 'Grady'
     * faker.person.lastName('male') // 'Barton'
     *
     * @since 8.0.0
     */
    lastName(sex?: SexType): string;
    /**
     * Returns a random middle name.
     *
     * @param sex The optional sex to use.
     * Can be either `'female'` or `'male'`.
     *
     * @example
     * faker.person.middleName() // 'James'
     * faker.person.middleName('female') // 'Eloise'
     * faker.person.middleName('male') // 'Asher'
     *
     * @since 8.0.0
     */
    middleName(sex?: SexType): string;
    /**
     * Generates a random full name.
     *
     * @param options An options object.
     * @param options.firstName The optional first name to use. If not specified a random one will be chosen.
     * @param options.lastName The optional last name to use. If not specified a random one will be chosen.
     * @param options.sex The optional sex to use. Can be either `'female'` or `'male'`.
     *
     * @example
     * faker.person.fullName() // 'Allen Brown'
     * faker.person.fullName({ firstName: 'Joann' }) // 'Joann Osinski'
     * faker.person.fullName({ firstName: 'Marcella', sex: 'female' }) // 'Mrs. Marcella Huels'
     * faker.person.fullName({ lastName: 'Beer' }) // 'Mr. Alfonso Beer'
     * faker.person.fullName({ sex: 'male' }) // 'Fernando Schaefer'
     *
     * @since 8.0.0
     */
    fullName(options?: {
        /**
         * The optional first name to use. If not specified a random one will be chosen.
         *
         * @default faker.person.firstName(sex)
         */
        firstName?: string;
        /**
         * The optional last name to use. If not specified a random one will be chosen.
         *
         * @default faker.person.lastName(sex)
         */
        lastName?: string;
        /**
         * The optional sex to use. Can be either `'female'` or `'male'`.
         *
         * @default faker.helpers.arrayElement(['female', 'male'])
         */
        sex?: SexType;
    }): string;
    /**
     * Returns a random gender.
     *
     * @see faker.person.sex(): For generating a binary-gender value.
     *
     * @example
     * faker.person.gender() // 'Trans*Man'
     *
     * @since 8.0.0
     */
    gender(): string;
    /**
     * Returns a random sex.
     *
     * Output of this method is localised, so it should not be used to fill the parameter `sex`
     * available in some other modules for example `faker.person.firstName()`.
     *
     * @see faker.person.gender(): For generating a gender related value.
     * @see faker.person.sexType(): For generating a sex value to be used as a parameter.
     *
     * @example
     * faker.person.sex() // 'female'
     *
     * @since 8.0.0
     */
    sex(): string;
    /**
     * Returns a random sex type. The `SexType` is intended to be used in parameters and conditions.
     *
     * @see faker.person.gender(): For generating a gender related value in forms.
     * @see faker.person.sex(): For generating a binary-gender value in forms.
     *
     * @example
     * faker.person.sexType() // Sex.Female
     *
     * @since 8.0.0
     */
    sexType(): SexType;
    /**
     * Returns a random short biography
     *
     * @example
     * faker.person.bio() // 'oatmeal advocate, veteran 🐠'
     *
     * @since 8.0.0
     */
    bio(): string;
    /**
     * Returns a random person prefix.
     *
     * @param sex The optional sex to use. Can be either `'female'` or `'male'`.
     *
     * @example
     * faker.person.prefix() // 'Miss'
     * faker.person.prefix('female') // 'Ms.'
     * faker.person.prefix('male') // 'Mr.'
     *
     * @since 8.0.0
     */
    prefix(sex?: SexType): string;
    /**
     * Returns a random person suffix.
     *
     * @example
     * faker.person.suffix() // 'DDS'
     *
     * @since 8.0.0
     */
    suffix(): string;
    /**
     * Generates a random job title.
     *
     * @example
     * faker.person.jobTitle() // 'Global Accounts Engineer'
     *
     * @since 8.0.0
     */
    jobTitle(): string;
    /**
     * Generates a random job descriptor.
     *
     * @example
     * faker.person.jobDescriptor() // 'Customer'
     *
     * @since 8.0.0
     */
    jobDescriptor(): string;
    /**
     * Generates a random job area.
     *
     * @example
     * faker.person.jobArea() // 'Brand'
     *
     * @since 8.0.0
     */
    jobArea(): string;
    /**
     * Generates a random job type.
     *
     * @example
     * faker.person.jobType() // 'Assistant'
     *
     * @since 8.0.0
     */
    jobType(): string;
    /**
     * Returns a random zodiac sign.
     *
     * @example
     * faker.person.zodiacSign() // 'Pisces'
     *
     * @since 8.0.0
     */
    zodiacSign(): string;
}

/**
 * Module to generate phone-related data.
 *
 * ### Overview
 *
 * For a phone number, use [`number()`](https://fakerjs.dev/api/phone.html#number). Many locales provide country-specific formats.
 */
declare class PhoneModule extends ModuleBase {
    /**
     * Generates a random phone number.
     *
     * @param options Options object
     * @param options.style Style of the phone number. Defaults to `'human'`.
     *
     * @see faker.string.numeric(): For generating a random string of numbers.
     * @see faker.helpers.fromRegExp(): For generating a phone number matching a regular expression.
     *
     * @example
     * faker.phone.number() // '961-770-7727'
     * faker.phone.number({ style: 'human' }) // '555.770.7727 x1234'
     * faker.phone.number({ style: 'national' }) // '(961) 770-7727'
     * faker.phone.number({ style: 'international' }) // '+15551234567'
     *
     * @since 7.3.0
     */
    number(options?: {
        /**
         * Style of the generated phone number:
         * - `'human'`: (default) A human-input phone number, e.g. `555-770-7727` or `555.770.7727 x1234`
         * - `'national'`: A phone number in a standardized national format, e.g. `(555) 123-4567`.
         * - `'international'`: A phone number in the E.123 international format, e.g. `+15551234567`
         *
         * @default 'human'
         */
        style?: 'human' | 'national' | 'international';
    }): string;
    /**
     * Generates IMEI number.
     *
     * @example
     * faker.phone.imei() // '13-850175-913761-7'
     *
     * @since 6.2.0
     */
    imei(): string;
}

/**
 * Module to return various types of words.
 */
declare class WordModule extends ModuleBase {
    /**
     * Returns a random adjective.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.word.adjective() // 'pungent'
     * faker.word.adjective(5) // 'slimy'
     * faker.word.adjective(100) // 'complete'
     * faker.word.adjective({ strategy: 'shortest' }) // 'icy'
     * faker.word.adjective({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'distant'
     *
     * @since 6.0.0
     */
    adjective(options?: number | {
        /**
         * The expected length of the word.
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Returns a random adverb.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.word.adverb() // 'quarrelsomely'
     * faker.word.adverb(5) // 'madly'
     * faker.word.adverb(100) // 'sadly'
     * faker.word.adverb({ strategy: 'shortest' }) // 'too'
     * faker.word.adverb({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'sweetly'
     *
     * @since 6.0.0
     */
    adverb(options?: number | {
        /**
         * The expected length of the word.
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Returns a random conjunction.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.word.conjunction() // 'in order that'
     * faker.word.conjunction(5) // 'since'
     * faker.word.conjunction(100) // 'as long as'
     * faker.word.conjunction({ strategy: 'shortest' }) // 'or'
     * faker.word.conjunction({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'hence'
     *
     * @since 6.0.0
     */
    conjunction(options?: number | {
        /**
         * The expected length of the word.
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Returns a random interjection.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.word.interjection() // 'gah'
     * faker.word.interjection(5) // 'fooey'
     * faker.word.interjection(100) // 'yowza'
     * faker.word.interjection({ strategy: 'shortest' }) // 'hm'
     * faker.word.interjection({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'boohoo'
     *
     * @since 6.0.0
     */
    interjection(options?: number | {
        /**
         * The expected length of the word.
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Returns a random noun.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.word.noun() // 'external'
     * faker.word.noun(5) // 'front'
     * faker.word.noun(100) // 'care'
     * faker.word.noun({ strategy: 'shortest' }) // 'ad'
     * faker.word.noun({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'average'
     *
     * @since 6.0.0
     */
    noun(options?: number | {
        /**
         * The expected length of the word.
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Returns a random preposition.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.word.preposition() // 'without'
     * faker.word.preposition(5) // 'abaft'
     * faker.word.preposition(100) // 'an'
     * faker.word.preposition({ strategy: 'shortest' }) // 'a'
     * faker.word.preposition({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'given'
     *
     * @since 6.0.0
     */
    preposition(options?: number | {
        /**
         * The expected length of the word.
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Returns a random verb.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.word.verb() // 'act'
     * faker.word.verb(5) // 'tinge'
     * faker.word.verb(100) // 'mess'
     * faker.word.verb({ strategy: 'shortest' }) // 'do'
     * faker.word.verb({ length: { min: 5, max: 7 }, strategy: "fail" }) // 'vault'
     *
     * @since 6.0.0
     */
    verb(options?: number | {
        /**
         * The expected length of the word.
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Returns a random word, that can be an adjective, adverb, conjunction, interjection, noun, preposition, or verb.
     *
     * @param options The expected length of the word or the options to use.
     * @param options.length The expected length of the word.
     * @param options.strategy The strategy to apply when no words with a matching length are found.
     *
     * Available error handling strategies:
     *
     * - `fail`: Throws an error if no words with the given length are found.
     * - `shortest`: Returns any of the shortest words.
     * - `closest`: Returns any of the words closest to the given length.
     * - `longest`: Returns any of the longest words.
     * - `any-length`: Returns a word with any length.
     *
     * Defaults to `'any-length'`.
     *
     * @example
     * faker.word.sample() // 'incidentally'
     * faker.word.sample(5) // 'fruit'
     *
     * @since 8.0.0
     */
    sample(options?: number | {
        /**
         * The expected length of the word.
         */
        length?: number | {
            /**
             * The minimum length of the word.
             */
            min: number;
            /**
             * The maximum length of the word.
             */
            max: number;
        };
        /**
         * The strategy to apply when no words with a matching length are found.
         *
         * Available error handling strategies:
         *
         * - `fail`: Throws an error if no words with the given length are found.
         * - `shortest`: Returns any of the shortest words.
         * - `closest`: Returns any of the words closest to the given length.
         * - `longest`: Returns any of the longest words.
         * - `any-length`: Returns a word with any length.
         *
         * @default 'any-length'
         */
        strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    }): string;
    /**
     * Returns a random string containing some words separated by spaces.
     *
     * @param options The optional options object or the number of words to return.
     * @param options.count The number of words to return. Defaults to a random value between `1` and `3`.
     *
     * @example
     * faker.word.words() // 'almost'
     * faker.word.words(5) // 'before hourly patiently dribble equal'
     * faker.word.words({ count: 5 }) // 'whoever edible um kissingly faraway'
     * faker.word.words({ count: { min: 5, max: 10 } }) // 'vice buoyant through apropos poised total wary boohoo'
     *
     * @since 8.0.0
     */
    words(options?: number | {
        /**
         * The number of words to return.
         *
         * @default { min: 1, max: 3 }
         */
        count?: number | {
            /**
             * The minimum number of words to return.
             */
            min: number;
            /**
             * The maximum number of words to return.
             */
            max: number;
        };
    }): string;
}

/**
 * Interface for a random number generator.
 *
 * **Note:** Normally there is no need to implement this interface directly,
 * unless you want to achieve a specific goal with it.
 *
 * This interface enables you to use random generators from third party libraries such as [pure-rand](https://github.com/dubzzz/pure-rand).
 *
 * Instances are expected to be ready for use before being passed to any Faker constructor,
 * this includes being `seed()`ed with either a random or fixed value.
 *
 * For more information please refer to the [documentation](https://fakerjs.dev/api/randomizer.html).
 *
 * @example
 * import { Faker, Randomizer, SimpleFaker } from '@faker-js/faker';
 * import { RandomGenerator, xoroshiro128plus } from 'pure-rand';
 *
 * function generatePureRandRandomizer(
 *   seed: number | number[] = Date.now() ^ (Math.random() * 0x100000000),
 *   factory: (seed: number) => RandomGenerator = xoroshiro128plus
 * ): Randomizer {
 *   const self = {
 *     next: () => (self.generator.unsafeNext() >>> 0) / 0x100000000,
 *     seed: (seed: number | number[]) => {
 *       self.generator = factory(typeof seed === 'number' ? seed : seed[0]);
 *     },
 *   } as Randomizer & { generator: RandomGenerator };
 *   self.seed(seed);
 *   return self;
 * }
 *
 * const randomizer = generatePureRandRandomizer();
 *
 * const simpleFaker = new SimpleFaker({ randomizer });
 *
 * const faker = new Faker({
 *   locale: ...,
 *   randomizer,
 * });
 *
 * @since 8.2.0
 */
interface Randomizer {
    /**
     * Generates a random float between 0 (inclusive) and 1 (exclusive).
     *
     * @example
     * randomizer.next() // 0.3404027920160495
     * randomizer.next() // 0.929890375900335
     * randomizer.next() // 0.5866362918861691
     *
     * @since 8.2.0
     */
    next(): number;
    /**
     * Sets the seed to use.
     *
     * @param seed The seed to use.
     *
     * @example
     * // Random seeds
     * randomizer.seed(Date.now() ^ (Math.random() * 0x100000000));
     * // Fixed seeds (for reproducibility)
     * randomizer.seed(42);
     * randomizer.seed([42, 13.37]);
     *
     * @since 8.2.0
     */
    seed(seed: number | number[]): void;
}

/**
 * Module to generate boolean values.
 *
 * ### Overview
 *
 * For a simple random true or false value, use [`boolean()`](https://fakerjs.dev/api/datatype.html#boolean).
 */
declare class DatatypeModule extends SimpleModuleBase {
    /**
     * Returns the boolean value true or false.
     *
     * **Note:**
     * A probability of `0.75` results in `true` being returned `75%` of the calls; likewise `0.3` => `30%`.
     * If the probability is `<= 0.0`, it will always return `false`.
     * If the probability is `>= 1.0`, it will always return `true`.
     * The probability is limited to two decimal places.
     *
     * @param options The optional options object or the probability (`[0.00, 1.00]`) of returning `true`.
     * @param options.probability The probability (`[0.00, 1.00]`) of returning `true`. Defaults to `0.5`.
     *
     * @example
     * faker.datatype.boolean() // false
     * faker.datatype.boolean(0.9) // true
     * faker.datatype.boolean({ probability: 0.1 }) // false
     *
     * @since 5.5.0
     */
    boolean(options?: number | {
        /**
         * The probability (`[0.00, 1.00]`) of returning `true`.
         *
         * @default 0.5
         */
        probability?: number;
    }): boolean;
}

/**
 * Module to generate numbers of any kind.
 *
 * ### Overview
 *
 * For simple integers, use [`int()`](https://fakerjs.dev/api/number.html#int). For decimal/floating-point numbers, use [`float()`](https://fakerjs.dev/api/number.html#float).
 *
 * For numbers not in base-10, you can use [`hex()`](https://fakerjs.dev/api/number.html#hex), [`octal()`](https://fakerjs.dev/api/number.html#octal) and [`binary()`](https://fakerjs.dev/api/number.html#binary)`.
 *
 * ### Related modules
 *
 * - For numeric strings of a given length, use [`faker.string.numeric()`](https://fakerjs.dev/api/string.html#numeric).
 * - For credit card numbers, use [`faker.finance.creditCardNumber()`](https://fakerjs.dev/api/finance.html#creditcardnumber).
 */
declare class NumberModule extends SimpleModuleBase {
    /**
     * Returns a single random integer between zero and the given max value or the given range.
     * The bounds are inclusive.
     *
     * @param options Maximum value or options object.
     * @param options.min Lower bound for generated number. Defaults to `0`.
     * @param options.max Upper bound for generated number. Defaults to `Number.MAX_SAFE_INTEGER`.
     * @param options.multipleOf Generated number will be a multiple of the given integer. Defaults to `1`.
     *
     * @throws When `min` is greater than `max`.
     * @throws When there are no suitable integers between `min` and `max`.
     * @throws When `multipleOf` is not a positive integer.
     *
     * @see faker.string.numeric(): For generating a `string` of digits with a given length (range).
     *
     * @example
     * faker.number.int() // 2900970162509863
     * faker.number.int(100) // 52
     * faker.number.int({ min: 1000000 }) // 2900970162509863
     * faker.number.int({ max: 100 }) // 42
     * faker.number.int({ min: 10, max: 100 }) // 57
     * faker.number.int({ min: 10, max: 100, multipleOf: 10 }) // 50
     *
     * @since 8.0.0
     */
    int(options?: number | {
        /**
         * Lower bound for generated number.
         *
         * @default 0
         */
        min?: number;
        /**
         * Upper bound for generated number.
         *
         * @default Number.MAX_SAFE_INTEGER
         */
        max?: number;
        /**
         * Generated number will be a multiple of the given integer.
         *
         * @default 1
         */
        multipleOf?: number;
    }): number;
    /**
     * Returns a single random floating-point number, by default between `0.0` and `1.0`. To change the range, pass a `min` and `max` value. To limit the number of decimal places, pass a `multipleOf` or `fractionDigits` parameter.
     *
     * @param options Upper bound or options object.
     * @param options.min Lower bound for generated number, inclusive. Defaults to `0.0`.
     * @param options.max Upper bound for generated number, exclusive, unless `multipleOf` or `fractionDigits` are passed. Defaults to `1.0`.
     * @param options.multipleOf The generated number will be a multiple of this parameter. Only one of `multipleOf` or `fractionDigits` should be passed.
     * @param options.fractionDigits The maximum number of digits to appear after the decimal point, for example `2` will round to 2 decimal points.  Only one of `multipleOf` or `fractionDigits` should be passed.
     *
     * @throws When `min` is greater than `max`.
     * @throws When `multipleOf` is negative.
     * @throws When `fractionDigits` is negative.
     * @throws When `fractionDigits` and `multipleOf` is passed in the same options object.
     *
     * @example
     * faker.number.float() // 0.5688541042618454
     * faker.number.float(3) // 2.367973240558058
     * faker.number.float({ max: 100 }) // 17.3687307164073
     * faker.number.float({ min: 20, max: 30 }) // 23.94764115102589
     * faker.number.float({ multipleOf: 0.25, min: 0, max:10 }) // 7.75
     * faker.number.float({ fractionDigits: 1 }) // 0.9
     * faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }) // 35.42
     * faker.number.float({ min: 10, max: 100, fractionDigits: 3 }) // 65.716
     * faker.number.float({ min: 10, max: 100, multipleOf: 0.001 }) // 65.716 - same as above
     *
     * @since 8.0.0
     */
    float(options?: number | {
        /**
         * Lower bound for generated number, inclusive.
         *
         * @default 0.0
         */
        min?: number;
        /**
         * Upper bound for generated number, exclusive, unless `multipleOf` or `fractionDigits` are passed.
         *
         * @default 1.0
         */
        max?: number;
        /**
         * The maximum number of digits to appear after the decimal point, for example `2` will round to 2 decimal points.  Only one of `multipleOf` or `fractionDigits` should be passed.
         */
        fractionDigits?: number;
        /**
         * The generated number will be a multiple of this parameter. Only one of `multipleOf` or `fractionDigits` should be passed.
         */
        multipleOf?: number;
    }): number;
    /**
     * Returns a [binary](https://en.wikipedia.org/wiki/Binary_number) number.
     * The bounds are inclusive.
     *
     * @param options Maximum value or options object.
     * @param options.min Lower bound for generated number. Defaults to `0`.
     * @param options.max Upper bound for generated number. Defaults to `1`.
     *
     * @throws When `min` is greater than `max`.
     * @throws When there are no integers between `min` and `max`.
     *
     * @see faker.string.binary(): For generating a `binary string` with a given length (range).
     *
     * @example
     * faker.number.binary() // '1'
     * faker.number.binary(255) // '110101'
     * faker.number.binary({ min: 0, max: 65535 }) // '10110101'
     *
     * @since 8.0.0
     */
    binary(options?: number | {
        /**
         * Lower bound for generated number.
         *
         * @default 0
         */
        min?: number;
        /**
         * Upper bound for generated number.
         *
         * @default 1
         */
        max?: number;
    }): string;
    /**
     * Returns an [octal](https://en.wikipedia.org/wiki/Octal) number.
     * The bounds are inclusive.
     *
     * @param options Maximum value or options object.
     * @param options.min Lower bound for generated number. Defaults to `0`.
     * @param options.max Upper bound for generated number. Defaults to `7`.
     *
     * @throws When `min` is greater than `max`.
     * @throws When there are no integers between `min` and `max`.
     *
     * @see faker.string.octal(): For generating an `octal string` with a given length (range).
     *
     * @example
     * faker.number.octal() // '5'
     * faker.number.octal(255) // '377'
     * faker.number.octal({ min: 0, max: 65535 }) // '4766'
     *
     * @since 8.0.0
     */
    octal(options?: number | {
        /**
         * Lower bound for generated number.
         *
         * @default 0
         */
        min?: number;
        /**
         * Upper bound for generated number.
         *
         * @default 7
         */
        max?: number;
    }): string;
    /**
     * Returns a lowercase [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) number.
     * The bounds are inclusive.
     *
     * @param options Maximum value or options object.
     * @param options.min Lower bound for generated number. Defaults to `0`.
     * @param options.max Upper bound for generated number. Defaults to `15`.
     *
     * @throws When `min` is greater than `max`.
     * @throws When there are no integers between `min` and `max`.
     *
     * @example
     * faker.number.hex() // 'b'
     * faker.number.hex(255) // '9d'
     * faker.number.hex({ min: 0, max: 65535 }) // 'af17'
     *
     * @since 8.0.0
     */
    hex(options?: number | {
        /**
         * Lower bound for generated number.
         *
         * @default 0
         */
        min?: number;
        /**
         * Upper bound for generated number.
         *
         * @default 15
         */
        max?: number;
    }): string;
    /**
     * Returns a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type) number.
     * The bounds are inclusive.
     *
     * @param options Maximum value or options object.
     * @param options.min Lower bound for generated bigint. Defaults to `0n`.
     * @param options.max Upper bound for generated bigint. Defaults to `min + 999999999999999n`.
     *
     * @throws When `min` is greater than `max`.
     *
     * @example
     * faker.number.bigInt() // 55422n
     * faker.number.bigInt(100n) // 52n
     * faker.number.bigInt({ min: 1000000n }) // 431433n
     * faker.number.bigInt({ max: 100n }) // 42n
     * faker.number.bigInt({ min: 10n, max: 100n }) // 36n
     *
     * @since 8.0.0
     */
    bigInt(options?: bigint | number | string | boolean | {
        /**
         * Lower bound for generated bigint.
         *
         * @default 0n
         */
        min?: bigint | number | string | boolean;
        /**
         * Upper bound for generated bigint.
         *
         * @default min + 999999999999999n
         */
        max?: bigint | number | string | boolean;
    }): bigint;
}

/**
 * Type that provides auto-suggestions but also any string.
 *
 * @see https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609
 */
type LiteralUnion<TSuggested extends TBase, TBase = string> = TSuggested | (TBase & {
    zz_IGNORE_ME?: never;
});

type Casing = 'upper' | 'lower' | 'mixed';
type LowerAlphaChar = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
type UpperAlphaChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
type NumericChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type AlphaChar = LowerAlphaChar | UpperAlphaChar;
type AlphaNumericChar = AlphaChar | NumericChar;
/**
 * Module to generate string related entries.
 *
 * ### Overview
 *
 * For a string containing just A-Z characters, use [`alpha()`](https://fakerjs.dev/api/string.html#alpha). To add digits too, use [`alphanumeric()`](https://fakerjs.dev/api/string.html#alphanumeric). If you only want punctuation marks/symbols, use [`symbol()`](https://fakerjs.dev/api/string.html). For a full set of ASCII characters, use [`sample()`](https://fakerjs.dev/api/string.html#sample). For a custom set of characters, use [`fromCharacters()`](https://fakerjs.dev/api/string.html#fromcharacters).
 *
 * For strings of base-ten digits, use [`numeric()`](https://fakerjs.dev/api/string.html#numeric). For other bases, use [`binary()`](https://fakerjs.dev/api/string.html#binary), [`octal()`](https://fakerjs.dev/api/string.html#octal), or [`hexadecimal()`](https://fakerjs.dev/api/string.html#hexadecimal)).
 *
 * You can generate standard ID strings using [`uuid()`](https://fakerjs.dev/api/string.html#uuid) or [`nanoid()`](https://fakerjs.dev/api/string.html#nanoid).
 *
 * ### Related modules
 *
 * - Emoji can be found at [`faker.internet.emoji()`](https://fakerjs.dev/api/internet.html#emoji).
 * - The [`faker.helpers`](https://fakerjs.dev/api/helpers.html) module includes a number of string related methods.
 */
declare class StringModule extends SimpleModuleBase {
    /**
     * Generates a string from the given characters.
     *
     * @param characters The characters to use for the string. Can be a string or an array of characters.
     * If it is an array, then each element is treated as a single character even if it is a string with multiple characters.
     * @param length The length of the string to generate. Defaults to `1`.
     * @param length.min The minimum length of the string to generate.
     * @param length.max The maximum length of the string to generate.
     *
     * @example
     * faker.string.fromCharacters('abc') // 'c'
     * faker.string.fromCharacters(['a', 'b', 'c']) // 'a'
     * faker.string.fromCharacters('abc', 10) // 'cbbbacbacb'
     * faker.string.fromCharacters('abc', { min: 5, max: 10 }) // 'abcaaaba'
     *
     * @since 8.0.0
     */
    fromCharacters(characters: string | ReadonlyArray<string>, length?: number | {
        /**
         * The minimum length of the string to generate.
         */
        min: number;
        /**
         * The maximum length of the string to generate.
         */
        max: number;
    }): string;
    /**
     * Generating a string consisting of letters in the English alphabet.
     *
     * @param options Either the number of characters or an options instance.
     * @param options.length The number or range of characters to generate. Defaults to `1`.
     * @param options.casing The casing of the characters. Defaults to `'mixed'`.
     * @param options.exclude An array with characters which should be excluded in the generated string. Defaults to `[]`.
     *
     * @example
     * faker.string.alpha() // 'b'
     * faker.string.alpha(10) // 'fEcAaCVbaR'
     * faker.string.alpha({ length: { min: 5, max: 10 } }) // 'HcVrCf'
     * faker.string.alpha({ casing: 'lower' }) // 'r'
     * faker.string.alpha({ exclude: ['W'] }) // 'Z'
     * faker.string.alpha({ length: 5, casing: 'upper', exclude: ['A'] }) // 'DTCIC'
     *
     * @since 8.0.0
     */
    alpha(options?: number | {
        /**
         * The number or range of characters to generate.
         *
         * @default 1
         */
        length?: number | {
            /**
             * The minimum number of characters to generate.
             */
            min: number;
            /**
             * The maximum number of characters to generate.
             */
            max: number;
        };
        /**
         * The casing of the characters.
         *
         * @default 'mixed'
         */
        casing?: Casing;
        /**
         * An array with characters which should be excluded in the generated string.
         *
         * @default []
         */
        exclude?: ReadonlyArray<LiteralUnion<AlphaChar>> | string;
    }): string;
    /**
     * Generating a string consisting of alpha characters and digits.
     *
     * @param options Either the number of characters or an options instance.
     * @param options.length The number or range of characters and digits to generate. Defaults to `1`.
     * @param options.casing The casing of the characters. Defaults to `'mixed'`.
     * @param options.exclude An array of characters and digits which should be excluded in the generated string. Defaults to `[]`.
     *
     * @example
     * faker.string.alphanumeric() // '2'
     * faker.string.alphanumeric(5) // '3e5V7'
     * faker.string.alphanumeric({ length: { min: 5, max: 10 } }) // 'muaApG'
     * faker.string.alphanumeric({ casing: 'upper' }) // 'A'
     * faker.string.alphanumeric({ exclude: ['W'] }) // 'r'
     * faker.string.alphanumeric({ length: 5, exclude: ["a"] }) // 'x1Z7f'
     *
     * @since 8.0.0
     */
    alphanumeric(options?: number | {
        /**
         * The number or range of characters and digits to generate.
         *
         * @default 1
         */
        length?: number | {
            /**
             * The minimum number of characters and digits to generate.
             */
            min: number;
            /**
             * The maximum number of characters and digits to generate.
             */
            max: number;
        };
        /**
         * The casing of the characters.
         *
         * @default 'mixed'
         */
        casing?: Casing;
        /**
         * An array of characters and digits which should be excluded in the generated string.
         *
         * @default []
         */
        exclude?: ReadonlyArray<LiteralUnion<AlphaNumericChar>> | string;
    }): string;
    /**
     * Returns a [binary](https://en.wikipedia.org/wiki/Binary_number) string.
     *
     * @param options The optional options object.
     * @param options.length The number or range of characters to generate after the prefix. Defaults to `1`.
     * @param options.prefix Prefix for the generated number. Defaults to `'0b'`.
     *
     * @see faker.number.binary(): For generating a binary number (within a range).
     *
     * @example
     * faker.string.binary() // '0b1'
     * faker.string.binary({ length: 10 }) // '0b1101011011'
     * faker.string.binary({ length: { min: 5, max: 10 } }) // '0b11101011'
     * faker.string.binary({ prefix: '0b' }) // '0b1'
     * faker.string.binary({ length: 10, prefix: 'bin_' }) // 'bin_1101011011'
     *
     * @since 8.0.0
     */
    binary(options?: {
        /**
         * The number or range of characters to generate after the prefix.
         *
         * @default 1
         */
        length?: number | {
            /**
             * The minimum number of characters to generate.
             */
            min: number;
            /**
             * The maximum number of characters to generate.
             */
            max: number;
        };
        /**
         * Prefix for the generated number.
         *
         * @default '0b'
         */
        prefix?: string;
    }): string;
    /**
     * Returns an [octal](https://en.wikipedia.org/wiki/Octal) string.
     *
     * @param options The optional options object.
     * @param options.length The number or range of characters to generate after the prefix. Defaults to `1`.
     * @param options.prefix Prefix for the generated number. Defaults to `'0o'`.
     *
     * @see faker.number.octal(): For generating an octal number (within a range).
     *
     * @example
     * faker.string.octal() // '0o3'
     * faker.string.octal({ length: 10 }) // '0o1526216210'
     * faker.string.octal({ length: { min: 5, max: 10 } }) // '0o15263214'
     * faker.string.octal({ prefix: '0o' }) // '0o7'
     * faker.string.octal({ length: 10, prefix: 'oct_' }) // 'oct_1542153414'
     *
     * @since 8.0.0
     */
    octal(options?: {
        /**
         * The number or range of characters to generate after the prefix.
         *
         * @default 1
         */
        length?: number | {
            /**
             * The minimum number of characters to generate.
             */
            min: number;
            /**
             * The maximum number of characters to generate.
             */
            max: number;
        };
        /**
         * Prefix for the generated number.
         *
         * @default '0o'
         */
        prefix?: string;
    }): string;
    /**
     * Returns a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) string.
     *
     * @param options The optional options object.
     * @param options.length The number or range of characters to generate after the prefix. Defaults to `1`.
     * @param options.casing Casing of the generated number. Defaults to `'mixed'`.
     * @param options.prefix Prefix for the generated number. Defaults to `'0x'`.
     *
     * @example
     * faker.string.hexadecimal() // '0xB'
     * faker.string.hexadecimal({ length: 10 }) // '0xaE13d044cB'
     * faker.string.hexadecimal({ length: { min: 5, max: 10 } }) // '0x7dEf7FCD'
     * faker.string.hexadecimal({ prefix: '0x' }) // '0xE'
     * faker.string.hexadecimal({ casing: 'lower' }) // '0xf'
     * faker.string.hexadecimal({ length: 10, prefix: '#' }) // '#f12a974eB1'
     * faker.string.hexadecimal({ length: 10, casing: 'upper' }) // '0xE3F38014FB'
     * faker.string.hexadecimal({ casing: 'lower', prefix: '' }) // 'd'
     * faker.string.hexadecimal({ length: 10, casing: 'mixed', prefix: '0x' }) // '0xAdE330a4D1'
     *
     * @since 8.0.0
     */
    hexadecimal(options?: {
        /**
         * The number or range of characters to generate after the prefix.
         *
         * @default 1
         */
        length?: number | {
            /**
             * The minimum number of characters to generate after the prefix.
             */
            min: number;
            /**
             * The maximum number of characters to generate after the prefix.
             */
            max: number;
        };
        /**
         * Casing of the generated number.
         *
         * @default 'mixed'
         */
        casing?: Casing;
        /**
         * Prefix for the generated number.
         *
         * @default '0x'
         */
        prefix?: string;
    }): string;
    /**
     * Generates a given length string of digits.
     *
     * @param options Either the number of characters or the options to use.
     * @param options.length The number or range of digits to generate. Defaults to `1`.
     * @param options.allowLeadingZeros Whether leading zeros are allowed or not. Defaults to `true`.
     * @param options.exclude An array of digits which should be excluded in the generated string. Defaults to `[]`.
     *
     * @see faker.number.int(): For generating a number (within a range).
     *
     * @example
     * faker.string.numeric() // '2'
     * faker.string.numeric(5) // '31507'
     * faker.string.numeric(42) // '06434563150765416546479875435481513188548'
     * faker.string.numeric({ length: { min: 5, max: 10 } }) // '197089478'
     * faker.string.numeric({ length: 42, allowLeadingZeros: false }) // '72564846278453876543517840713421451546115'
     * faker.string.numeric({ length: 6, exclude: ['0'] }) // '943228'
     *
     * @since 8.0.0
     */
    numeric(options?: number | {
        /**
         * The number or range of digits to generate.
         *
         * @default 1
         */
        length?: number | {
            /**
             * The minimum number of digits to generate.
             */
            min: number;
            /**
             * The maximum number of digits to generate.
             */
            max: number;
        };
        /**
         * Whether leading zeros are allowed or not.
         *
         * @default true
         */
        allowLeadingZeros?: boolean;
        /**
         * An array of digits which should be excluded in the generated string.
         *
         * @default []
         */
        exclude?: ReadonlyArray<LiteralUnion<NumericChar>> | string;
    }): string;
    /**
     * Returns a string containing UTF-16 chars between 33 and 125 (`!` to `}`).
     *
     * @param length Length of the generated string. Defaults to `10`.
     * @param length.min The minimum number of characters to generate.
     * @param length.max The maximum number of characters to generate.
     *
     * @example
     * faker.string.sample() // 'Zo!.:*e>wR'
     * faker.string.sample(5) // '6Bye8'
     * faker.string.sample({ min: 5, max: 10 }) // 'FeKunG'
     *
     * @since 8.0.0
     */
    sample(length?: number | {
        /**
         * The minimum number of characters to generate.
         */
        min: number;
        /**
         * The maximum number of characters to generate.
         */
        max: number;
    }): string;
    /**
     * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
     *
     * @example
     * faker.string.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
     *
     * @since 8.0.0
     */
    uuid(): string;
    /**
     * Generates a [Nano ID](https://github.com/ai/nanoid).
     *
     * @param length Length of the generated string. Defaults to `21`.
     * @param length.min The minimum length of the Nano ID to generate.
     * @param length.max The maximum length of the Nano ID to generate.
     *
     * @example
     * faker.string.nanoid() // ptL0KpX_yRMI98JFr6B3n
     * faker.string.nanoid(10) // VsvwSdm_Am
     * faker.string.nanoid({ min: 13, max: 37 }) // KIRsdEL9jxVgqhBDlm
     *
     * @since 8.0.0
     */
    nanoid(length?: number | {
        /**
         * The minimum length of the Nano ID to generate.
         */
        min: number;
        /**
         * The maximum length of the Nano ID to generate.
         */
        max: number;
    }): string;
    /**
     * Returns a string containing only special characters from the following list:
     * ```txt
     * ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~
     * ```
     *
     * @param length Length of the generated string. Defaults to `1`.
     * @param length.min The minimum number of special characters to generate.
     * @param length.max The maximum number of special characters to generate.
     *
     * @example
     * faker.string.symbol() // '$'
     * faker.string.symbol(5) // '#*!.~'
     * faker.string.symbol({ min: 5, max: 10 }) // ')|@*>^+'
     *
     * @since 8.0.0
     */
    symbol(length?: number | {
        /**
         * The minimum number of special characters to generate.
         */
        min: number;
        /**
         * The maximum number of special characters to generate.
         */
        max: number;
    }): string;
}

/**
 * This is a simplified Faker class that doesn't need any localized data to generate its output.
 *
 * It only includes methods from:
 * - `datatype`
 * - `date` (without `month` and `weekday`)
 * - `helpers` (without `fake`)
 * - `number`
 * - `string`
 *
 * @example
 * import { simpleFaker } from '@faker-js/faker';
 * // const { simpleFaker } = require('@faker-js/faker');
 *
 * // simpleFaker.seed(1234);
 *
 * simpleFaker.number.int(10); // 4
 * simpleFaker.string.uuid(); // 'c50e1f5c-86e8-4aa9-888e-168e0a182519'
 */
declare class SimpleFaker {
    protected _defaultRefDate: () => Date;
    /**
     * Gets a new reference date used to generate relative dates.
     */
    get defaultRefDate(): () => Date;
    /**
     * Sets the `refDate` source to use if no `refDate` date is passed to the date methods.
     *
     * @param dateOrSource The function or the static value used to generate the `refDate` date instance.
     * The function must return a new valid `Date` instance for every call.
     * Defaults to `() => new Date()`.
     *
     * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
     * @see faker.seed(): For generating reproducible values.
     *
     * @example
     * faker.seed(1234);
     *
     * // Default behavior
     * // faker.setDefaultRefDate();
     * faker.date.past(); // Changes based on the current date/time
     *
     * // Use a static ref date
     * faker.setDefaultRefDate(new Date('2020-01-01'));
     * faker.date.past(); // Reproducible '2019-07-03T08:27:58.118Z'
     *
     * // Use a ref date that changes every time it is used
     * let clock = new Date("2020-01-01").getTime();
     * faker.setDefaultRefDate(() => {
     *   clock += 1000; // +1s
     *   return new Date(clock);
     * });
     *
     * faker.defaultRefDate() // 2020-01-01T00:00:01Z
     * faker.defaultRefDate() // 2020-01-01T00:00:02Z
     *
     * @since 8.0.0
     */
    setDefaultRefDate(dateOrSource?: string | Date | number | (() => Date)): void;
    readonly datatype: DatatypeModule;
    readonly date: SimpleDateModule;
    readonly helpers: SimpleHelpersModule;
    readonly number: NumberModule;
    readonly string: StringModule;
    /**
     * Creates a new instance of SimpleFaker.
     *
     * In nearly any case you should use the prebuilt `simpleFaker` instances instead of the constructor.
     *
     * @param options The options to use.
     * @param options.randomizer The Randomizer to use.
     * Specify this only if you want to use it to achieve a specific goal,
     * such as sharing the same random generator with other instances/tools.
     * Defaults to faker's Mersenne Twister based pseudo random number generator.
     *
     * @example
     * import { SimpleFaker } from '@faker-js/faker';
     * // const { SimpleFaker } = require('@faker-js/faker');
     *
     * // create a SimpleFaker without any locale data
     * const customSimpleFaker = new SimpleFaker();
     *
     * customSimpleFaker.helpers.arrayElement(['red', 'green', 'blue']); // 'green'
     * customSimpleFaker.number.int(10); // 4
     *
     * @since 8.1.0
     */
    constructor(options?: {
        /**
         * The Randomizer to use.
         * Specify this only if you want to use it to achieve a specific goal,
         * such as sharing the same random generator with other instances/tools.
         *
         * @default generateMersenne53Randomizer()
         */
        randomizer?: Randomizer;
    });
    /**
     * Sets the seed or generates a new one.
     *
     * Please note that generated values are dependent on both the seed and the
     * number of calls that have been made since it was set.
     *
     * This method is intended to allow for consistent values in tests, so you
     * might want to use hardcoded values as the seed.
     *
     * In addition to that it can be used for creating truly random tests
     * (by passing no arguments), that still can be reproduced if needed,
     * by logging the result and explicitly setting it if needed.
     *
     * @param seed The seed to use. Defaults to a random number.
     *
     * @returns The seed that was set.
     *
     * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
     * @see faker.setDefaultRefDate(): For generating reproducible relative dates.
     *
     * @example
     * // Consistent values for tests:
     * faker.seed(42)
     * faker.number.int(10); // 4
     * faker.number.int(10); // 8
     *
     * faker.seed(42)
     * faker.number.int(10); // 4
     * faker.number.int(10); // 8
     *
     * // Random but reproducible tests:
     * // Simply log the seed, and if you need to reproduce it, insert the seed here
     * console.log('Running test with seed:', faker.seed());
     *
     * @since 6.0.0
     */
    seed(seed?: number): number;
    /**
     * Sets the seed array.
     *
     * Please note that generated values are dependent on both the seed and the
     * number of calls that have been made since it was set.
     *
     * This method is intended to allow for consistent values in a tests, so you
     * might want to use hardcoded values as the seed.
     *
     * In addition to that it can be used for creating truly random tests
     * (by passing no arguments), that still can be reproduced if needed,
     * by logging the result and explicitly setting it if needed.
     *
     * @param seedArray The seed array to use.
     *
     * @returns The seed array that was set.
     *
     * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
     * @see faker.setDefaultRefDate(): For generating reproducible relative dates.
     *
     * @example
     * // Consistent values for tests:
     * faker.seed([42, 13, 17])
     * faker.number.int(10); // 4
     * faker.number.int(10); // 8
     *
     * faker.seed([42, 13, 17])
     * faker.number.int(10); // 4
     * faker.number.int(10); // 8
     *
     * // Random but reproducible tests:
     * // Simply log the seed, and if you need to reproduce it, insert the seed here
     * console.log('Running test with seed:', faker.seed());
     *
     * @since 6.0.0
     */
    seed(seedArray: number[]): number[];
    /**
     * Sets the seed or generates a new one.
     *
     * Please note that generated values are dependent on both the seed and the
     * number of calls that have been made since it was set.
     *
     * This method is intended to allow for consistent values in a tests, so you
     * might want to use hardcoded values as the seed.
     *
     * In addition to that it can be used for creating truly random tests
     * (by passing no arguments), that still can be reproduced if needed,
     * by logging the result and explicitly setting it if needed.
     *
     * @param seed The seed or seed array to use.
     *
     * @returns The seed that was set.
     *
     * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
     * @see faker.setDefaultRefDate(): For generating reproducible dates.
     *
     * @example
     * // Consistent values for tests (using a number):
     * faker.seed(42)
     * faker.number.int(10); // 4
     * faker.number.int(10); // 8
     *
     * faker.seed(42)
     * faker.number.int(10); // 4
     * faker.number.int(10); // 8
     *
     * // Consistent values for tests (using an array):
     * faker.seed([42, 13, 17])
     * faker.number.int(10); // 4
     * faker.number.int(10); // 8
     *
     * faker.seed([42, 13, 17])
     * faker.number.int(10); // 4
     * faker.number.int(10); // 8
     *
     * // Random but reproducible tests:
     * // Simply log the seed, and if you need to reproduce it, insert the seed here
     * console.log('Running test with seed:', faker.seed());
     *
     * @since 6.0.0
     */
    seed(seed?: number | number[]): number | number[];
}
declare const simpleFaker: SimpleFaker;

/**
 * This is Faker's main class containing all modules that can be used to generate data.
 *
 * Please have a look at the individual modules and methods for more information and examples.
 *
 * @example
 * import { faker } from '@faker-js/faker';
 * // const { faker } = require('@faker-js/faker');
 *
 * // faker.seed(1234);
 *
 * faker.person.firstName(); // 'John'
 * faker.person.lastName(); // 'Doe'
 * @example
 * import { Faker, es } from '@faker-js/faker';
 * // const { Faker, es } = require('@faker-js/faker');
 *
 * // create a Faker instance with only es data and no en fallback (=> smaller bundle size)
 * const customFaker = new Faker({ locale: [es] });
 *
 * customFaker.person.firstName(); // 'Javier'
 * customFaker.person.lastName(); // 'Ocampo Corrales'
 *
 * customFaker.music.genre(); // throws Error as this data is not available in `es`
 */
declare class Faker extends SimpleFaker {
    readonly rawDefinitions: LocaleDefinition;
    readonly definitions: LocaleProxy;
    readonly color: ColorModule;
    readonly date: DateModule;
    readonly helpers: HelpersModule;
    readonly image: ImageModule;
    readonly internet: InternetModule;
    readonly location: LocationModule;
    readonly lorem: LoremModule;
    readonly person: PersonModule;
    readonly phone: PhoneModule;
    readonly word: WordModule;
    /** @deprecated Use {@link Faker#location} instead */
    get address(): LocationModule;
    /** @deprecated Use {@link Faker#person} instead */
    get name(): PersonModule;
    /**
     * Creates a new instance of Faker.
     *
     * In most cases you should use one of the prebuilt Faker instances instead of the constructor, for example `fakerDE`, `fakerFR`, ...
     *
     * You only need to use the constructor if you need custom fallback logic or a custom locale.
     *
     * For more information see our [Localization Guide](https://fakerjs.dev/guide/localization.html).
     *
     * @param options The options to use.
     * @param options.locale The locale data to use.
     * @param options.randomizer The Randomizer to use.
     * Specify this only if you want to use it to achieve a specific goal,
     * such as sharing the same random generator with other instances/tools.
     * Defaults to faker's Mersenne Twister based pseudo random number generator.
     *
     * @example
     * import { Faker, es } from '@faker-js/faker';
     * // const { Faker, es } = require('@faker-js/faker');
     *
     * // create a Faker instance with only es data and no en fallback (=> smaller bundle size)
     * const customFaker = new Faker({ locale: [es] });
     *
     * customFaker.person.firstName(); // 'Javier'
     * customFaker.person.lastName(); // 'Ocampo Corrales'
     *
     * customFaker.music.genre(); // throws Error as this data is not available in `es`
     *
     * @since 8.0.0
     */
    constructor(options: {
        /**
         * The locale data to use for this instance.
         * If an array is provided, the first locale that has a definition for a given property will be used.
         *
         * @see mergeLocales(): For more information about how the locales are merged.
         */
        locale: LocaleDefinition | LocaleDefinition[];
        /**
         * The Randomizer to use.
         * Specify this only if you want to use it to achieve a specific goal,
         * such as sharing the same random generator with other instances/tools.
         *
         * @default generateMersenne53Randomizer()
         */
        randomizer?: Randomizer;
    });
    /**
     * Returns an object with metadata about the current locale.
     *
     * @example
     * import { faker, fakerES_MX } from '@faker-js/faker';
     * // const { faker, fakerES_MX } = require("@faker-js/faker")
     * faker.getMetadata(); // { title: 'English', code: 'en', language: 'en', endonym: 'English', dir: 'ltr', script: 'Latn' }
     * fakerES_MX.getMetadata(); // { title: 'Spanish (Mexico)', code: 'es_MX', language: 'es', endonym: 'Español (México)', dir: 'ltr', script: 'Latn', country: 'MX' }
     *
     * @since 8.1.0
     */
    getMetadata(): MetadataDefinition;
}
type FakerOptions = ConstructorParameters<typeof Faker>[0];

/**
 * Base class for all modules that use a `SimpleFaker` instance.
 */
declare abstract class SimpleModuleBase {
    protected readonly faker: SimpleFaker;
    constructor(faker: SimpleFaker);
}
/**
 * Base class for all modules that use a `Faker` instance.
 */
declare abstract class ModuleBase extends SimpleModuleBase {
    protected readonly faker: Faker;
    constructor(faker: Faker);
}

type EmojiType = 'smiley' | 'body' | 'person' | 'nature' | 'food' | 'travel' | 'activity' | 'object' | 'symbol' | 'flag';
type HTTPStatusCodeType = 'informational' | 'success' | 'clientError' | 'serverError' | 'redirection';
type HTTPProtocolType = 'http' | 'https';
/**
 * Module to generate internet related entries.
 *
 * ### Overview
 *
 * For user accounts, you may need an [`email()`](https://fakerjs.dev/api/internet.html#email) and a [`password()`](https://fakerjs.dev/api/internet.html#password), as well as a ASCII [`userName()`](https://fakerjs.dev/api/internet.html#username) or Unicode [`displayName()`](https://fakerjs.dev/api/internet.html#displayname). Since the emails generated could coincidentally be real email addresses, you should not use these for sending real email addresses. If this is a concern, use [`exampleEmail()`](https://fakerjs.dev/api/internet.html#exampleemail) instead.
 *
 * For websites, you can generate a [`domainName()`](https://fakerjs.dev/api/internet.html#domainname) or a full [`url()`](https://fakerjs.dev/api/internet.html#url).
 *
 * To make your data more 🔥, you can use [`emoji()`](https://fakerjs.dev/api/internet.html#emoji).
 *
 * You also have access to a number of the more technical elements of web requests, such as [`httpMethod`](https://fakerjs.dev/api/internet.html#httpmethod), [`httpStatusCode`](https://fakerjs.dev/api/internet.html#httpstatuscode), [`ip`](https://fakerjs.dev/api/internet.html#ip), [`mac`](https://fakerjs.dev/api/internet.html#mac), [`userAgent`](https://fakerjs.dev/api/internet.html#useragent), and [`port`](https://fakerjs.dev/api/internet.html#port).
 */
declare class InternetModule extends ModuleBase {
    /**
     * Generates an email address using the given person's name as base.
     *
     * @param options The options to use.
     * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
     * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
     * @param options.provider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
     * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
     * in the email address. Defaults to `false`.
     *
     * @example
     * faker.internet.email() // 'Kassandra4@hotmail.com'
     * faker.internet.email({ firstName: 'Jeanne'}) // 'Jeanne63@yahoo.com'
     * faker.internet.email({ firstName: 'Jeanne'}) // 'Jeanne_Smith63@yahoo.com'
     * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne.Doe63@yahoo.com'
     * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev' }) // 'Jeanne_Doe88@example.fakerjs.dev'
     * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
     *
     * @since 2.0.1
     */
    email(options?: {
        /**
         * The optional first name to use.
         *
         * @default faker.person.firstName()
         */
        firstName?: string;
        /**
         * The optional last name to use.
         *
         * @default faker.person.lastName()
         */
        lastName?: string;
        /**
         * The mail provider domain to use. If not specified, a random free mail provider will be chosen.
         */
        provider?: string;
        /**
         * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
         *
         * @default false
         */
        allowSpecialCharacters?: boolean;
    }): string;
    /**
     * Generates an email address using an example mail provider using the given person's name as base.
     *
     * @param options An options object.
     * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
     * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
     * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
     * in the email address. Defaults to `false`.
     *
     * @example
     * faker.internet.exampleEmail() // 'Helmer.Graham23@example.com'
     * faker.internet.exampleEmail({ firstName: 'Jeanne' }) // 'Jeanne96@example.net'
     * faker.internet.exampleEmail({ firstName: 'Jeanne' }) // 'Jeanne.Smith96@example.net'
     * faker.internet.exampleEmail({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne_Doe96@example.net'
     * faker.internet.exampleEmail({ firstName: 'Jeanne', lastName: 'Doe', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
     *
     * @since 3.1.0
     */
    exampleEmail(options?: {
        /**
         * The optional first name to use.
         *
         * @default faker.person.firstName()
         */
        firstName?: string;
        /**
         * The optional last name to use.
         *
         * @default faker.person.lastName()
         */
        lastName?: string;
        /**
         * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
         *
         * @default false
         */
        allowSpecialCharacters?: boolean;
    }): string;
    /**
     * Generates a username using the given person's name as base.
     * The resulting username may use neither, one or both of the names provided.
     * This will always return a plain ASCII string.
     * Some basic stripping of accents and transliteration of characters will be done.
     *
     * @param options An options object.
     * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
     * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
     *
     * @see faker.internet.displayName(): For generating an Unicode display name.
     *
     * @example
     * faker.internet.userName() // 'Nettie_Zboncak40'
     * faker.internet.userName({ firstName: 'Jeanne' }) // 'Jeanne98'
     * faker.internet.userName({ firstName: 'Jeanne' }) // 'Jeanne.Smith98'
     * faker.internet.userName({ firstName: 'Jeanne', lastName: 'Doe'}) // 'Jeanne_Doe98'
     * faker.internet.userName({ firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
     * faker.internet.userName({ firstName: 'Hélene', lastName: 'Müller' }) // 'Helene_Muller11'
     * faker.internet.userName({ firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Fedor.Dostoevskii50'
     * faker.internet.userName({ firstName: '大羽', lastName: '陳' }) // 'hlzp8d.tpv45' - note neither name is used
     *
     * @since 2.0.1
     */
    userName(options?: {
        /**
         * The optional first name to use.
         *
         * @default faker.person.firstName()
         */
        firstName?: string;
        /**
         * The optional last name to use.
         *
         * @default faker.person.lastName()
         */
        lastName?: string;
    }): string;
    /**
     * Generates a display name using the given person's name as base.
     * The resulting display name may use one or both of the provided names.
     * If the input names include Unicode characters, the resulting display name will contain Unicode characters.
     * It will not contain spaces.
     *
     * @param options An options object.
     * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
     * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
     *
     * @see faker.internet.userName(): For generating a plain ASCII username.
     *
     * @example
     * faker.internet.displayName() // 'Nettie_Zboncak40'
     * faker.internet.displayName({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne98' - note surname not used.
     * faker.internet.displayName({ firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
     * faker.internet.displayName({ firstName: 'Hélene', lastName: 'Müller' }) // 'Hélene_Müller11'
     * faker.internet.displayName({ firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Фёдор.Достоевский50'
     * faker.internet.displayName({ firstName: '大羽', lastName: '陳' }) // '大羽.陳'
     *
     * @since 8.0.0
     */
    displayName(options?: {
        /**
         * The optional first name to use.
         *
         * @default faker.person.firstName()
         */
        firstName?: string;
        /**
         * The optional last name to use.
         *
         * @default faker.person.lastName()
         */
        lastName?: string;
    }): string;
    /**
     * Returns a random web protocol. Either `http` or `https`.
     *
     * @example
     * faker.internet.protocol() // 'http'
     * faker.internet.protocol() // 'https'
     *
     * @since 2.1.5
     */
    protocol(): 'http' | 'https';
    /**
     * Returns a random http method.
     *
     * Can be either of the following:
     *
     * - `GET`
     * - `POST`
     * - `PUT`
     * - `DELETE`
     * - `PATCH`
     *
     * @example
     * faker.internet.httpMethod() // 'PATCH'
     *
     * @since 5.4.0
     */
    httpMethod(): 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    /**
     * Generates a random HTTP status code.
     *
     * @param options Options object.
     * @param options.types A list of the HTTP status code types that should be used.
     *
     * @example
     * faker.internet.httpStatusCode() // 200
     * faker.internet.httpStatusCode({ types: ['success', 'serverError'] }) // 500
     *
     * @since 7.0.0
     */
    httpStatusCode(options?: {
        /**
         * A list of the HTTP status code types that should be used.
         *
         * @default Object.keys(faker.definitions.internet.http_status_code)
         */
        types?: ReadonlyArray<HTTPStatusCodeType>;
    }): number;
    /**
     * Generates a random http(s) url.
     *
     * @param options Optional options object.
     * @param options.appendSlash Whether to append a slash to the end of the url (path). Defaults to a random boolean value.
     * @param options.protocol The protocol to use. Defaults to `'https'`.
     *
     * @example
     * faker.internet.url() // 'https://remarkable-hackwork.info'
     * faker.internet.url({ appendSlash: true }) // 'https://slow-timer.info/'
     * faker.internet.url({ protocol: 'http', appendSlash: false }) // 'http://www.terrible-idea.com'
     *
     * @since 2.1.5
     */
    url(options?: {
        /**
         * Whether to append a slash to the end of the url (path).
         *
         * @default faker.datatype.boolean()
         */
        appendSlash?: boolean;
        /**
         * The protocol to use.
         *
         * @default 'https'
         */
        protocol?: HTTPProtocolType;
    }): string;
    /**
     * Generates a random domain name.
     *
     * @example
     * faker.internet.domainName() // 'slow-timer.info'
     *
     * @since 2.0.1
     */
    domainName(): string;
    /**
     * Returns a random domain suffix.
     *
     * @example
     * faker.internet.domainSuffix() // 'com'
     * faker.internet.domainSuffix() // 'name'
     *
     * @since 2.0.1
     */
    domainSuffix(): string;
    /**
     * Generates a random domain word.
     *
     * @example
     * faker.internet.domainWord() // 'close-reality'
     * faker.internet.domainWord() // 'weird-cytoplasm'
     *
     * @since 2.0.1
     */
    domainWord(): string;
    /**
     * Generates a random IPv4 or IPv6 address.
     *
     * @example
     * faker.internet.ip() // '245.108.222.0'
     * faker.internet.ip() // '4e5:f9c5:4337:abfd:9caf:1135:41ad:d8d3'
     *
     * @since 2.0.1
     */
    ip(): string;
    /**
     * Generates a random IPv4 address.
     *
     * @example
     * faker.internet.ipv4() // '245.108.222.0'
     *
     * @since 6.1.1
     */
    ipv4(): string;
    /**
     * Generates a random IPv6 address.
     *
     * @example
     * faker.internet.ipv6() // '269f:1230:73e3:318d:842b:daab:326d:897b'
     *
     * @since 4.0.0
     */
    ipv6(): string;
    /**
     * Generates a random port number.
     *
     * @example
     * faker.internet.port() // '9414'
     *
     * @since 5.4.0
     */
    port(): number;
    /**
     * Generates a random user agent string.
     *
     * @example
     * faker.internet.userAgent()
     * // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
     *
     * @since 2.0.1
     */
    userAgent(): string;
    /**
     * Generates a random css hex color code in aesthetically pleasing color palette.
     *
     * Based on
     * http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
     *
     * @param options An options object.
     * @param options.redBase The optional base red in range between `0` and `255`. Defaults to `0`.
     * @param options.greenBase The optional base green in range between `0` and `255`. Defaults to `0`.
     * @param options.blueBase The optional base blue in range between `0` and `255`. Defaults to `0`.
     *
     * @example
     * faker.internet.color() // '#30686e'
     * faker.internet.color({ redBase: 100, greenBase: 100, blueBase: 100 }) // '#4e5f8b'
     *
     * @since 2.0.1
     */
    color(options?: {
        /**
         * The optional base red in range between `0` and `255`.
         *
         * @default 0
         */
        redBase?: number;
        /**
         * The optional base green in range between `0` and `255`.
         *
         * @default 0
         */
        greenBase?: number;
        /**
         * The optional base blue in range between `0` and `255`.
         *
         * @default 0
         */
        blueBase?: number;
    }): string;
    /**
     * Generates a random mac address.
     *
     * @param options An options object.
     * @param separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
     *
     * @example
     * faker.internet.mac() // '32:8e:2e:09:c6:05'
     *
     * @since 3.0.0
     */
    mac(options?: {
        /**
         * The optional separator to use. Can be either `':'`, `'-'` or `''`.
         *
         * @default ':'
         */
        separator?: string;
    }): string;
    /**
     * Generates a random mac address.
     *
     * @param sep The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
     *
     * @example
     * faker.internet.mac() // '32:8e:2e:09:c6:05'
     *
     * @since 3.0.0
     */
    mac(sep?: string): string;
    /**
     * Generates a random mac address.
     *
     * @param options The optional separator or an options object.
     * @param separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
     *
     * @example
     * faker.internet.mac() // '32:8e:2e:09:c6:05'
     *
     * @since 3.0.0
     */
    mac(options?: string | {
        /**
         * The optional separator to use. Can be either `':'`, `'-'` or `''`.
         *
         * @default ':'
         */
        separator?: string;
    }): string;
    /**
     * Generates a random password-like string. Do not use this method for generating actual passwords for users.
     * Since the source of the randomness is not cryptographically secure, neither is this generator.
     *
     * @param options An options object.
     * @param options.length The length of the password to generate. Defaults to `15`.
     * @param options.memorable Whether the generated password should be memorable. Defaults to `false`.
     * @param options.pattern The pattern that all chars should match.
     * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
     * @param options.prefix The prefix to use. Defaults to `''`.
     *
     * @example
     * faker.internet.password() // '89G1wJuBLbGziIs'
     * faker.internet.password({ length: 20 }) // 'aF55c_8O9kZaPOrysFB_'
     * faker.internet.password({ length: 20, memorable: true }) // 'lawetimufozujosodedi'
     * faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/ }) // 'HMAQDFFYLDDUTBKVNFVS'
     * faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello ' }) // 'Hello IREOXTDWPERQSB'
     *
     * @since 2.0.1
     */
    password(options?: {
        /**
         * The length of the password to generate.
         *
         * @default 15
         */
        length?: number;
        /**
         * Whether the generated password should be memorable.
         *
         * @default false
         */
        memorable?: boolean;
        /**
         * The pattern that all chars should match.
         * This option will be ignored, if `memorable` is `true`.
         *
         * @default /\w/
         */
        pattern?: RegExp;
        /**
         * The prefix to use.
         *
         * @default ''
         */
        prefix?: string;
    }): string;
    /**
     * Generates a random emoji.
     *
     * @param options Options object.
     * @param options.types A list of the emoji types that should be included. Possible values are `'smiley'`, `'body'`, `'person'`, `'nature'`, `'food'`, `'travel'`, `'activity'`, `'object'`, `'symbol'`, `'flag'`. By default, emojis from any type will be included.
     *
     * @example
     * faker.internet.emoji() // '🥰'
     * faker.internet.emoji({ types: ['food', 'nature'] }) // '🥐'
     *
     * @since 6.2.0
     */
    emoji(options?: {
        /**
         * A list of the emoji types that should be used.
         *
         * @default Object.keys(faker.definitions.internet.emoji)
         */
        types?: ReadonlyArray<EmojiType>;
    }): string;
}

/**
 * The possible definitions related to internet stuff.
 */
type InternetDefinition = LocaleEntry<{
    /**
     * Common top level and similar domains (e.g `de`, `co.uk`).
     */
    domain_suffix: string[];
    /**
     * Some email domains containing `example` (e.g. `example.com`).
     */
    example_email: string[];
    /**
     * Some free-mail domains used in that country (e.g. `gmail.de`).
     */
    free_email: string[];
    /**
     * List of all fully-qualified emojis.
     */
    emoji: Record<EmojiType, string[]>;
    /**
     * List of some HTTP status codes.
     */
    http_status_code: Record<HTTPStatusCodeType, number[]>;
}>;

/**
 * The possible definitions related to addresses and locations.
 */
type LocationDefinition = LocaleEntry<{
    /**
     * Postcodes patterns by state
     */
    postcode_by_state: {
        [state: string]: string;
    };
    /**
     * Postcodes patterns.
     */
    postcode: string | string[];
    /**
     * The patterns to generate city names.
     */
    city_pattern: string[];
    /**
     * The names of actual cities.
     */
    city_name: string[];
    /**
     * Common city prefixes.
     */
    city_prefix: string[];
    /**
     * Common city suffixes.
     */
    city_suffix: string[];
    /**
     * The names of all countries.
     */
    country: string[];
    /**
     * The [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country codes.
     */
    country_code: Array<{
        alpha2: string;
        alpha3: string;
        numeric: string;
    }>;
    /**
     * The names of this country's states, or other first-level administrative areas.
     */
    state: string[];
    /**
     * The abbreviated names of this country's states, or other first-level administrative areas.
     */
    state_abbr: string[];
    /**
     * The names of counties, or other second-level administrative areas, inside the country's states.
     */
    county: string[];
    /**
     * The names of the compass directions.
     * First the 4 cardinal directions, then the 4 ordinal directions.
     */
    direction: {
        /**
         * The names of the cardinal compass directions.
         * Cardinal directions are the four main points of a compass.
         */
        cardinal: string[];
        /**
         * The abbreviated names of the cardinal compass directions.
         * Cardinal directions are the four main points of a compass.
         */
        cardinal_abbr: string[];
        /**
         * The names of ordinal compass directions.
         * Ordinal directions are combinations of cardinal directions.
         */
        ordinal: string[];
        /**
         * The abbreviated names of ordinal compass directions.
         * Ordinal directions are combinations of cardinal directions.
         */
        ordinal_abbr: string[];
    };
    /**
     * The pattern used to generate building numbers. Since building numbers rarely start with 0, any consecutive # characters will be replaced by a number without a leading zero.
     */
    building_number: string[];
    /**
     * The patterns to generate street names.
     */
    street_pattern: string[];
    /**
     * The names of actual streets.
     */
    street_name: string[];
    /**
     * Common street prefixes.
     */
    street_prefix: string[];
    /**
     * Common street suffixes.
     */
    street_suffix: string[];
    /**
     * The pattern used to generate street addresses.
     */
    street_address: {
        /**
         * The fake pattern to generate only the street address.
         */
        normal: string;
        /**
         * The fake pattern to generate the full street address including the secondary address.
         */
        full: string;
    };
    /**
     * The address "inside" an address/e.g. an apartment or office. Since these rarely start with 0, any consecutive # characters will be replaced by a number without a leading zero.
     */
    secondary_address: string[];
    /**
     * A list of time zones names relevant to this locale.
     *
     * @see [IANA Time Zone Database](https://www.iana.org/time-zones)
     */
    time_zone: string[];
}>;

/**
 * The possible definitions related to lorem texts.
 */
type LoremDefinition = LocaleEntry<{
    /**
     * Lorem words used to generate dummy texts.
     */
    word: string[];
}>;

/**
 * Metadata for pre-built locales.
 */
type PreBuiltMetadataDefinition = {
    /**
     * The English name of the language (and the specific country, if defined).
     */
    title: string;
    /**
     * The full code of the locale, including the country code if applicable.
     */
    code: string;
    /**
     * The endonym (native name) of the language (and the specific country, if defined).
     *
     * @see https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_and_their_capitals_in_native_languages
     */
    endonym: string;
    /**
     * The ISO 639-1 code of the language.
     *
     * @see https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
     */
    language: string;
    /**
     * The specific variant of the language. This usually refers to a dialect or slang.
     */
    variant?: string;
    /**
     * The direction of the language, either 'ltr' (left to right) or 'rtl' (right to left).
     */
    dir: 'ltr' | 'rtl';
    /**
     * The ISO 15924 code of the script.
     *
     * @see https://en.wikipedia.org/wiki/ISO_15924
     */
    script: string;
};
/**
 * Metadata for pre-built locales for a specific country.
 */
type PreBuiltMetadataDefinitionForCountry = PreBuiltMetadataDefinition & {
    /**
     * The ISO 3166-1 alpha-2 code of the country.
     *
     * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    country: string;
};
/**
 * Metadata for the current locale.
 */
type MetadataDefinition = LocaleEntry<PreBuiltMetadataDefinitionForCountry>;

type PersonEntryDefinition<T> = {
    generic?: T[];
    male: T[];
    female: T[];
} | {
    generic: T[];
    male?: never;
    female?: never;
};
type SimplePersonEntryDefinition = PersonEntryDefinition<string>;
type WeightedPersonEntryDefinition = PersonEntryDefinition<{
    value: string;
    weight: number;
}>;
/**
 * The possible definitions related to people's names.
 */
type PersonDefinition = LocaleEntry<{
    gender: string[];
    sex: string[];
    prefix: SimplePersonEntryDefinition;
    first_name: SimplePersonEntryDefinition;
    middle_name: SimplePersonEntryDefinition;
    last_name: SimplePersonEntryDefinition;
    suffix: string[];
    /**
     * A weighted list of patterns used to generate names.
     */
    name: Array<{
        value: string;
        weight: number;
    }>;
    /**
     * A weighted list of patterns used to generate last names.
     */
    last_name_pattern: WeightedPersonEntryDefinition;
    bio_pattern: string[];
    job_descriptor: string[];
    job_area: string[];
    job_type: string[];
    job_title_pattern: string[];
    western_zodiac_sign: string[];
}>;

/**
 * The possible definitions related to phone numbers.
 */
type PhoneNumberDefinition = LocaleEntry<{
    /**
     * Some patterns used to generate phone numbers.
     * `#` will be replaced by a random digit (0-9).
     * `!` will be replaced by a random digit (2-9).
     * (e.g. `!##-!##-####` -> 272-285-0453)
     *
     * @see faker.helpers.replaceSymbolWithNumber(format): For more information about how the patterns are used.
     */
    format: {
        /**
         * Formats for a human-input phone number, e.g. `555-770-7727` or `555.770.7727 x1234`
         */
        human: string[];
        /**
         * Formats for a phone number in a standardized national format, e.g. `(555) 123-4567`.
         */
        national: string[];
        /**
         * Formats for a phone number in the standardised E.123 format, e.g. `+15551234567`
         */
        international: string[];
    };
}>;

/**
 * The possible definitions related to words.
 */
type WordDefinition = LocaleEntry<{
    adjective: string[];
    adverb: string[];
    conjunction: string[];
    interjection: string[];
    noun: string[];
    preposition: string[];
    verb: string[];
}>;

/**
 * Wrapper type for all definition categories that will make all properties optional and allow extra properties.
 */
type LocaleEntry<TCategoryDefinition extends Record<string, unknown>> = {
    [P in keyof TCategoryDefinition]?: TCategoryDefinition[P] | null;
} & Record<string, unknown>;
/**
 * The definitions as used by the translations/locales.
 */
type LocaleDefinition = {
    metadata?: MetadataDefinition;
    color?: ColorDefinition;
    date?: DateDefinition;
    internet?: InternetDefinition;
    location?: LocationDefinition;
    lorem?: LoremDefinition;
    person?: PersonDefinition;
    phone_number?: PhoneNumberDefinition;
    word?: WordDefinition;
} & Record<string, Record<string, unknown>>;

/**
 * The possible definitions related to colors.
 */
type ColorDefinition = LocaleEntry<{
    /**
     * Human-readable color names.
     */
    human: string[];
    /**
     * Color space names.
     */
    space: string[];
}>;

declare const faker: Faker;

export { PhoneModule as A, StringModule as B, type ColorDefinition as C, type DateDefinition as D, WordModule as E, Faker as F, SimpleFaker as G, HelpersModule as H, type InternetDefinition as I, simpleFaker as J, faker as K, type LocaleDefinition as L, type MetadataDefinition as M, type NumberColorFormat as N, type PersonDefinition as P, type Randomizer as R, type StringColorFormat as S, type WordDefinition as W, type DateEntryDefinition as a, type LocaleEntry as b, type LocationDefinition as c, type LoremDefinition as d, type PersonEntryDefinition as e, type PhoneNumberDefinition as f, type FakerOptions as g, CssFunction as h, CssSpace as i, type Casing$1 as j, type ColorFormat as k, ColorModule as l, type CssFunctionType as m, type CssSpaceType as n, DatatypeModule as o, DateModule as p, SimpleDateModule as q, SimpleHelpersModule as r, ImageModule as s, InternetModule as t, LocationModule as u, LoremModule as v, NumberModule as w, Sex as x, PersonModule as y, type SexType as z };
