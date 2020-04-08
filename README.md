# Adeslas web project

## Installation

### Install composer depenencies

Execute composer install to install the project locally.

```bash
php composer install
```

### Install Symfony CLI

Execute composer install to install the project locally.

```bash
wget https://get.symfony.com/cli/installer -O - | bash
```

Add symfony to your user path

```bash
```

### Install webpack dependencies

This project uses [symfony's webpack encore](https://symfony.com/doc/current/frontend.html) to manage project assets.

```bash
# yarn install dev --watch
yarn add dev
# or
npm install
```

### Run a local development server

Use the following command to use Symfony's `symfony/web-server-bundle`.

```bash
# Starts a local development server on the 8000 port
/home/jose/.symfony/bin/symfony server:start --no-tls
```

Execute encore to update imports of js files and functions.

```bash
yarn encore dev --watch
# or
npm run-script watch
```