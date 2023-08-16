/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './nuxt.config.{js,ts}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '991px',
      // => @media (min-width: 768px) { ... }

      lg: '1280px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      screens: {
        // lg: '1200px',
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      minWidth: {
        '1/2': '50%',
        '2/2': '68%',
        '3/3': '10px',
        '4/4': '128px',
        '5/5': '114px',
        '6/6': '44px',
        '7/7': '78px',
        '8/8': '170px',
        '9/9': '64px',
        '11/11': '88px',
        '12/12': '32px',
        '13/13': '50px',
        '14/14': '40px',
        '15/15': '102px',
        '16/16': '2px',
      },
      maxWidth: {
        '1/1': '156px',
        '2/2': '130px,',
        '3/3': '178px,',
        '4/4': '114px,',
        '5/5': '78px',
      },
      height: {
        128: '60vh',
        130: '496px',
        140: '440px',
        150: '392px',
        160: '502px',
        170: '624px',
        180: '484px',
        190: '334px',
        200: '90px',
        210: '260px',
        211: '348px',
        212: '78px',
        214: '102px',
        216: '390px',
        218: '214px',
        220: '80vh',
        222: '88px',
        223: '4px',
        224: '272px',
      },
      colors: {
        // TRY NOT TO USE THIS SHIT
        theme: '#4CB087',
        'bg-green': '#FAFAFA',
        'text-green': '#4CB087',
        'text-gray': '#5F5F5F',
        'bg-black': '#000000a6',
        'text-color': '#00000099',
        'bg-ofwight': '#7979790a',
        'bo-ofwight': '#d1d1d166',
        'border-top': 'rgba(0, 0, 0, 0.12)',
        'link-footer': 'rgba(0, 0, 0, 0.7)',
        'icons-download': 'rgba(217, 217, 217, 0.2)',
        'icon-header': '#BEBEBE',
        'border-list': '#DDDDDD',
        'icon-red': '#da4242',
        'bg-menu': '#F5F5F5',
        'fill-icons': ' rgba(0, 0, 0, 0.6)',
        'bg-login': '#00000082',
        'border-input': '#EEEEEE',
        'bg-icons': '#f9f9f9',
        'bg-overlay': '#333333b3',
        'bg-find': ' #DCF5EB',
        'text-icons': '#9D9D9D',
        'them-text': '#5A5A5A',
        'prj-border': '#E4E4E4',
        'text-progres': '#0B0B0B',
        'bg-progres': '#D9D9D9',
        icon: '#D6D6D6',

        // NEW COLOR THEME
        'primary-green': '#4CB087',
        'secondary-green': '#74D8AF',
        'dark-green': '#16B976',
        'primary-blue': '#1869EA',
        'secondary-blue': '#063D96',
        'dark-blue': '#7DAFFF',
      },
      fontsize: {
        22: '22px',
        42: '42px',
        34: '34px',
        44: '10px',
      },

      dropShadow: {
        theme: '0px 0px 20px rgba(0, 0, 0, 0.05)',
        iconlogo: '0px 0px 50px rgba(0, 0, 0, 0.15)',
        shadowcard: '0px 0px 80px rgba(0, 0, 0, 0.06)',
        usershadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
        searchshadow: '0px 0px 145px rgba(0, 0, 0, 0.1)',
        mapshadow: '0px 0px 15px rgba(0, 0, 0, 0.03)',
        formrequest: '0px 0px 70px rgba(201, 201, 201, 0.08)',
        shadowlog: ' 0px 0px 25px rgba(0, 0, 0, 0.06)',
        shcomm: '0px 0px 49px rgba(0, 0, 0, 0.05)',
        searchsh: '0px 0px 50px rgba(0, 0, 0, 0.03)',
        shadcom: ' 0px 0px 14px rgba(0, 0, 0, 0.12)',
      },

      container: {
        center: true,
      },

      zIndex: {
        1000: '1000',
      },
      letterSpacing: {
        tightest: '0.0015em',
      },

      spacing: {
        '1/2': '-32px',
      },
      top: {
        '1/2': '6px',
      },
      backgroundImage: {
        'hero-pattern':
          'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgb(0 0 0 / 62%) 100%)',
        'blog-pattern':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.61) 40.04%, rgba(0, 0, 0, 0) 65.49%)',
        'svg-pattern': "url('~/assets/images/icons/arrow.svg')",
        'svg-pattern2': "url('~/assets/images/icons/arrow2.svg')",
      },

      margin: {
        22: '-94px',
        33: '-102px',
        44: '3px',
        55: '90px',
        66: '-24px',
      },
      bottom: {
        '1/1': '8%',
        '2/2': '-11px',
      },
    },
  },
  plugins: [],
}
