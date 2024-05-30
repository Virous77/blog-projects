```bash
curl -sSfL https://get.tur.so/install.sh | bash

```

# Create new DB

```bash
turso db create learning
```

# check DB

```bash
turso db show learning
```

# create key

```bash
turso db tokens create learning -e none
```

none means here it won't expire.

# Local dev using

```bash
turso dev --db-file learning.db
```

# Run migration

```bash
npx drizzle-kit generate

npx drizzle-kit push
```
