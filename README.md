# LightShop

This app is primarily written as a shopping cart (and order completition process) plugin into older PHP websites.
It consists of this React frontend part and PHP REST API backend (another repo). App is still under construction, and its approx 95% done.

## Run app

After instaling all dependencies, `yarn start` should be enough to run it.
Because this app is written as a component primarily for older PHP websites which uses SESSIONS and backend need to use them to be able to comunicate with the rest of the app, there is action required to make this work properly for development on localhost.

At Chrome set `disabled` flag at [chrome://flags/#same-site-by-default-cookies](chrome://flags/#same-site-by-default-cookies)
Also in Chrome settings put `localhost:3000` and `http://localhost:3000` to whitelist at Site settings>cookies and site data.
Now SESSIONS should work well.

You can compare shopping cart content with data on this endpoins, if it fits and session works
https://snowcorp.cz/ls/cart_api/addRandomItem
https://snowcorp.cz/ls/cart_api/getCart
https://snowcorp.cz/ls/cart_api/clearCart

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn cypress:run`

Run cypress tests.
Those are also runned as a pre-commit hook when you pushing to the origin.

### `yarn build`

Builds the app for production to the `build` folder.

## DevStack

App is buit on [Create React App](https://github.com/facebook/create-react-app) and it use:

- React hooks
- TypeScript
- ReactN for global state instead of Redux store
- CSS for styling, because styling is expected to be shared with already existent PHP app and its CSS styling
- Cypress for e2e tests, Jest for unit tests

## App features

The app contains this logical parts of e-shop:

- Shopping cart
- Selecion of delivery and payment methods
- Forms to enter personal info/delivery and invoice addres/company info
- Validation of all entered data
- Checkout order by sending all the data to backend
- Register user, login user

All those logical part are supported by following features

### Sync data to BE immediately

Every entered information is directly send to API to save it (2sec debounce).
So whenever browser is reloaded, it will pre-fill all already entered info.

### Locally store cart content

Store product `id` and `amount` in localstorage for case SESSION will expire, so it can easily renew existent shopping cart

### Form parts dependencies

Whole app is intentionally designed as one page app without any other screens or routes.
So user can see all the time same screen and dont need to navigate in it.
Which makes internal app logic more complicated, but it handle all those challenges like:

- Hiding form parts which are not necessary for all users (company info, invoice info)
- Copying form parts which can be same (delivery info and invoice info)
- Replace input delivery addres by readonly personal pickup address
- Permanent form validation indicator (blue/green) send order button

### Innitial data

As the app is intended to be rendered on PHP server, which is not supporting JS SSR, there is at least posibility send with app on fist load all static data inside HTML file in JSON format (delivery/payment methods). Also when app is refreshed, content of the shopping cart can be loaded from this JSON instead of initial API call to those data. When loading JSON from HTML will fail, then it call API. It makes app faster loaded and save some unnecessary initial API calls.

## i18N

App is using i18n, currently in Czech (primary language) and English

## Register/Login

User can create his account, and after login, input fields will be filled with known user information (personal info, address...)
