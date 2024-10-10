<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('app', () => ({
            hex: '',
            rgb: '',
            hsl: '',
            previewHex: '',
            previewRgb: '',
            previewColor: '#fff',
            previewHsl: '',

            onHexChange() {

                let hex = this.hex;
                let alpha = '';

                if (/^#?(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/gmi.test(hex) === false) {
                    this.rgb = '';
                    this.hsl = '';
                    this.previewHex = '';
                    this.previewRgb = '';
                    this.previewHsl = '';
                    this.previewColor = '#fff';
                    return;
                }

                let rgb = this.hexToRgb(hex);
                let hsl = this.rgbToHsl(...rgb);
                this.rgb = `rgba(${rgb.join(', ')})`;
                this.hsl = `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${hsl[3]})`;
                this.previewHex = hex.startsWith('#') ? hex : '#' + hex;
                this.previewColor = this.invertColor(hex);
                this.previewRgb = this.rgb;
                this.previewHsl = this.hsl;
            },

            onRgbChange() {
                let rgb = this.rgb;

                if (/rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]?\.?\d*?)?\)/gi.test(rgb) === false) {
                    this.hex = '';
                    this.hsl = '';
                    this.previewHex = '';
                    this.previewRgb = '';
                    this.previewHsl = '';
                    this.previewColor = '#fff';
                    return;
                }

                rgb = rgb.replace('rgb(', '') // bỏ rgb(
                    .replace('rgba(', '') // bỏ rgba(
                    .replace(')', '') // bỏ ) của rgb / rgba
                    .replaceAll(' ', ',') // đổi dạng (rr gg bb) về dạng (rr,gg,bb)
                    .split(',')
                    .filter(x => x.trim());

                let r = rgb[0];
                let g = rgb[1];
                let b = rgb[2];
                let a = rgb[3] || 1;
                a = a > 1 ? Math.min(a, 100) / 100 : Math.max(a, 0);

                let hex = this.rgbToHex(r, g, b, a);
                let hsl = this.rgbToHsl(r, g, b, a);

                this.hex = hex;
                this.hsl = `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${hsl[3]})`;
                this.previewColor = this.invertColor(this.hex);
                this.previewHex = this.hex;
                this.previewRgb = `rgba(${r}, ${g}, ${b}, ${a})`;
                this.previewHsl = this.hsl;
            },

            onHslChange() {
                let hsl = this.hsl;

                if (/hsla?\(\s*(0|[1-9]\d?|[12]\d\d|3[0-5]\d)\s*,\s*((0|[1-9]\d?|100)%)\s*,\s*((0|[1-9]\d?|100)%)\s*,?\s*(0?\.?\d*?)?\)/gi.test(hsl) === false) {
                    this.hex = '';
                    this.rgb = '';
                    this.previewHex = '';
                    this.previewRgb = '';
                    this.previewHsl = '';
                    this.previewColor = '#fff';
                    return;
                }

                hsl = hsl.replace('hsl(', '') // bỏ hsl(
                    .replace('hsla(', '') // bỏ hsla(
                    .replace(')', '') // bỏ ) của hsl / hsla
                    .replaceAll(' ', ',') // đổi dạng (hh ss ll) về dạng (hh, ss, ll)
                    .split(',')
                    .filter(x => x.trim());

                let h = hsl[0];
                let s = hsl[1].substr(0, hsl[1].length - 1);
                let l = hsl[2].substr(0, hsl[2].length - 1);
                let a = hsl[3] || 1;
                a = a > 1 ? Math.min(a, 100) / 100 : Math.max(a, 0);

                let rgb = this.hslToRgb(h, s, l, a);
                let hex = this.rgbToHex(...rgb);

                this.hex = hex;
                this.rgb = `rgba(${rgb.join(', ')})`;
                this.previewColor = this.invertColor(this.hex);
                this.previewHex = this.hex;
                this.previewRgb = this.rgb;
                this.previewHsl = `hsla(${h}, ${s}%, ${l}%, ${a})`;
            },

            hexToRgb(hex) {
                let r = 0, g = 0, b = 0, a = 1;

                if (hex.startsWith('#')) {
                    hex = hex.slice(1);
                }

                if (hex.length === 3) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }

                if (hex.length === 4) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
                }

                r = '0x' + hex[0] + hex[1];
                g = '0x' + hex[2] + hex[3];
                b = '0x' + hex[4] + hex[5];
                a = hex.length === 8 ? ('0x' + hex[6] + hex[7]) : '0xff';
                a = this.hexToAlpha(a);

                return [+r, +g, +b, a];
            },

            rgbToHex(r, g, b, a = 1) {
                a = this.alphaToHex(a);
                return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b) + a;
            },

            rgbToHsl(r, g, b, a = 1) {
                // Make r, g, and b fractions of 1
                r /= 255;
                g /= 255;
                b /= 255;

                // Find greatest and smallest channel values
                let cmin = Math.min(r,g,b),
                    cmax = Math.max(r,g,b),
                    delta = cmax - cmin,
                    h = 0,
                    s = 0,
                    l = 0;

                // Calculate hue
                // No difference
                if (delta == 0)
                    h = 0;
                // Red is max
                else if (cmax == r)
                    h = ((g - b) / delta) % 6;
                // Green is max
                else if (cmax == g)
                    h = (b - r) / delta + 2;
                // Blue is max
                else
                    h = (r - g) / delta + 4;

                h = Math.round(h * 60);

                // Make negative hues positive behind 360°
                if (h < 0)
                    h += 360;

                // Calculate lightness
                l = (cmax + cmin) / 2;

                // Calculate saturation
                s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

                // Multiply l and s by 100
                s = +(s * 100).toFixed(0);
                l = +(l * 100).toFixed(0);

                return [h, s, l, a];
            },

            hslToRgb(h, s, l, a = 1) {
                // Must be fractions of 1
                s /= 100;
                l /= 100;

                let c = (1 - Math.abs(2 * l - 1)) * s,
                    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
                    m = l - c/2,
                    r = 0,
                    g = 0,
                    b = 0;

                if (0 <= h && h < 60) {
                    r = c; g = x; b = 0;
                } else if (60 <= h && h < 120) {
                    r = x; g = c; b = 0;
                } else if (120 <= h && h < 180) {
                    r = 0; g = c; b = x;
                } else if (180 <= h && h < 240) {
                    r = 0; g = x; b = c;
                } else if (240 <= h && h < 300) {
                    r = x; g = 0; b = c;
                } else if (300 <= h && h < 360) {
                    r = c; g = 0; b = x;
                }
                r = Math.round((r + m) * 255);
                g = Math.round((g + m) * 255);
                b = Math.round((b + m) * 255);

                return [r, g, b, a];
            },

            hexToAlpha(hex) {
                return +(hex / 255).toFixed(3);
            },

            alphaToHex(a) {
                a = a > 1 ? Math.min(a, 100) / 100 : Math.max(a, 0);
                a = Math.round(a * 255).toString(16);

                if (a.toLowerCase() === 'ff') {
                    return '';
                }

                return a.length === 1 ? '0' + a : a;
            },

            componentToHex(c) {
                const hex = parseInt(c).toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            },

            invertColor(hex) {
                if (hex.indexOf('#') === 0) {
                    hex = hex.slice(1);
                }
                // convert 3-digit hex to 6-digits.
                if (hex.length === 3) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }

                let alpha = '';
                if (hex.length === 8) {
                    alpha = hex.slice(6);
                    hex = hex.slice(0, 6);

                    alpha = alpha.toLowerCase() === 'ff' ? '' : alpha;
                }

                if (alpha) {
                    alpha = parseInt(alpha, 16) / 255;
                    if (alpha < 0.5 && alpha > 0) {
                        return '#000000';
                    }
                }

                var r = parseInt(hex.slice(0, 2), 16),
                    g = parseInt(hex.slice(2, 4), 16),
                    b = parseInt(hex.slice(4, 6), 16);

                // https://stackoverflow.com/a/3943023/112731
                return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                    ? '#000000'
                    : '#FFFFFF';
            },
        })); // Alpine.data
    }); // alpine:init
</script>