# Hydro Addon Domain Extension

This is a [Hydro](https://github.com/hydro-dev/Hydro) Addon that provides extended features for domain.

## Installation

1. Clone the repository and install dependencies:

    ```bash
    git clone https://github.com/tywzoj/hydro-addon-domain-extension.git
    cd hydro-addon-domain-extension
    yarn install --prod
    ```

2. Apply the addon to your Hydro instance:

    ```bash
    hydrooj addon add /path/to/hydro-addon-domain-extension
    pm2 restart hydrooj
    ```

## Features

- **Discussion Node for Domain**: Provides a discussion node setting for each domain, allowing domain administrators to customize the discussion node.
- **Display Name Restriction**: Forces users to use the system display name in each domain and disallows users to edit their display name by themselves.
- **Hide No Permission Domains**: Hide domain in search result if user has no permission to view.
- **Hide Unjoined Default Role Users**: Hide unjoined users that have the default role in the domain user list.
- ... (more features to be added)

## License

This project is licensed under the AGPL-3.0-only License. See the [LICENSE](LICENSE) file for details.
