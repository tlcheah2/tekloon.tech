import Typography from "typography";

const typography = new Typography({
    baseFontSize: '16px',
    baseLineHeight: 2,
    headerFontFamily: [
        'Montserrat',
        'sans-serif'
    ],
    bodyFontFamily: [
        'Montserrat',
        'sans-serif'
    ],
    googleFonts: [
        {
            name: 'Montserrat',
            styles: [
                900,
                700,
                400,
            ]
        }
    ],
})

export default typography