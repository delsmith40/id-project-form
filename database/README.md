# Database Connection Instructions

1. Get the following database credentials from your customer:
   - Database host
   - Database port
   - Database name
   - Username
   - Password
   - SSL requirements (if any)

2. Set up the environment variables:
   ```
   DB_HOST=customer_host
   DB_PORT=customer_port
   DB_NAME=customer_database
   DB_USER=customer_username
   DB_PASSWORD=customer_password
   DB_SSL=true_or_false
   ```

3. Test the connection:
   ```bash
   mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p $DB_NAME
   ```

4. Import the schema if needed:
   ```bash
   mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p $DB_NAME < schema.sql
   ```

Note: Make sure you have the necessary VPN or firewall access to connect to the customer's database.