# Simple Mailer

### Hosted environment

This site is hosted on [Heroku](https://www.heroku.com/) Cloud platform. You may check this app at [https://young-brushlands-73025.herokuapp.com/](https://young-brushlands-73025.herokuapp.com/)

**NOTE**: _I may need to whitelist your email addresses in the Mailgun configuration before you can successfully use this._

### How to setup on your local machine

1. Clone this repo

```
git clone git@github.com:nobso/hybrid-mailer.git
```

2. Change directory into `mailer`

```
cd hybrid-mailer
```

3. Install the packages

```
npm install
```

4. Export the mailgun credentials

```
export MG_DOMAIN=[REPLACE WITH DOMAIN]
export MG_PRIVATE_KEY=[REPLACE WITH PRIVATE KEY]
export SG_PRIVATE_KEY=[REPLACE WITH PRIVATE KEY]
```

4. Run the app

```
npx gulp
```

5. The page will open automatically, if not hit the browser with `http://localhost:4000`

![mailer-updated](https://user-images.githubusercontent.com/3447433/73819260-01492180-47a4-11ea-9d1b-a8c5839f32b4.gif)

Note: That console log error message (with HTTP status code 422) was thrown during the form validation, so its an intended behavior.

## Development environment setup (MacOS)

1. Install Node Version Manager
    1. nvm (Node Version Manager) is a tool that allows you to download and install Node.js. Check if you have it installed via nvm --version
    1. Get the latest from [here](https://github.com/nvm-sh/nvm)
    1. This project is built using [version](https://github.com/nvm-sh/nvm) `0.34.0`
1. Install NodeJS
    1. Make sure you have the latest (LTS) NodeJS
    1. Get the lastest LTS from [here](https://nodejs.org/en/download/)
    1. This project is built using [version](https://nodejs.org/en/download/) `v12.14.1`
1. Install NPM
    1. This comes with NodeJS but its always good to check the version and make sure its upto date
    1. This project is built using [version](https://github.com/npm/cli/releases/tag/v6.13.7) `6.13.4`
1. Scaffolding
    1. [express-generator](https://expressjs.com/en/starter/generator.html) allows us to create a skeleton for a web application when we work with ExpressJS
    1. `pug` templating engine - Though there are a lot of other options available, i chose this based on the following reasons
        1. Page layout inheritance
        1. Include option
        1. Loop/control statements
        1. Client side rendering
        1. Easy to learn
    1. CSS engines
        1. There are multiple choices like SASS, STYLUS, LESS etc, but i went with vanilla CSS because this is a simple project and does not need any complicated or more reusable CSS components
1. `npm install` the required packages
    1. Fix the vulnerabilities issues by running the audits
    1. `nodemon` for auto reloading the server for changes
    1. `browser-sync` for refresing the browser
    1. `gulp` for running the tasks
1. `config.yml` to keep the application configuration based on the environment

## Accessibility (A11Y)

This site is 100% accessible

## Search Engine Optimization (SEO)

This site is 100% SEO compliant

## Non JavaScript Support

All the functionalities work even if there is no JavaScript support available on the client side

## Web Performance

The overall performance measured by LightHouse is A Grade.

1. All the assets are minified
1. CSS and JS served from respective single URL
1. Web page size is kept minimal

<img width="1599" alt="perf" src="https://user-images.githubusercontent.com/3447433/73641492-f451f400-4624-11ea-9d96-4c27de170119.png">

## Responsive web design (RWD)

This site is 100% responsive. It renders well on a variety of devices and window or screen sizes. I've tested using simulators. This site even renders good on landscape/portrait orientation.

## Browser Compatibility

I've tested this app manually in the following browsers and devices

1. Browsers
    1. Chrome (Version 79.0.3945.130 (Official Build) (64-bit)), Fire
    1. Firefox (72.0.2 (64-bit)
    1. Safari (Version 13.0.4 (15608.4.9.1.3))
1. Simulators
    1. iPhone 5/SE
    1. iPhone 6/7/8
    1. iPhone X
    1. iPad, iPad Pro
    1. Galaxy S5
    1. Pixel 2/XL
1. Real Devices
    1. iPhone 8

## TODO

1. For now, all the strings are hardcoded, we should add Internatiolization `i18n` support
1. CDN support for serving the assets
1. PWA support
1. Email Campaign HTML form should have a CAPTCHA support
1. Multiple email recipients
1. Unit and functional tests
1. CI/CD integration
