# HOW TO USE

1. Clone the repository and run `npm run i` or `yarn add`
2. Create `.env` file and paste

PORT=<`your port`>
</br>
DB_USERNAME=<`your DB username`>
</br>
DB_PASSWORD=<`your DB password`>
</br>
DB_DATABASE=<`your DB name`>
</br>
DB_HOST=<`your DB host`>
</br>
DB_PORT=<`your DB port`>
</br>
ACCESS_TOKEN_SECRET=<`secret access token`>
</br>
STRIPE_SECRET_KEY=<`stripe secret key`>
</br>
BASE_URL=<`your localhost server`>

3. For secret access token you can run `require('crypto').randomBytes(64).toString('hex')` on your node in terminal
4. For stripe secret key you can register in https://stripe.com and copy your stripe secret key

![Example image](./public/api_secret_key_navbar.png)
![Example image](./public/api_secret_key.png)

5. In your terminal run `npm run db:sync` or `yarn run db:sync` to create your database
6. Run the app with `yarn dev` or `npm run dev`
7. In your browser go to `/api-docs` to open the SWAGGER UI
