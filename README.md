# HTTP-ASTERISK-DIALPLAN-EDITOR

## About this service

A small http service to perform basic editions into an Asterisk dialplan configuration file and reload the service.

May not work entirely on Windows systems.

## How to install

1. Clone the repository by performing a git clone command.
2. Install dependencies by running `npm run i`
3. Create a default config file by running `npm run config:init`
4. Modify the `.env` file with your desired parameters. Please note, listening on a network interface different than `localhost` IS NOT RECOMMENDED. This is a non-protected service, and **it should not be exposed over the Internet.**
5. You can check that everything works as expected by running tests with `npm run test`
6. Run manually by `npm run start` or in the background with `forever` by `npm run start:background`
