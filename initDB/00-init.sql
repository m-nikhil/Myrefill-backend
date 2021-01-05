CREATE USER myrefill;
ALTER USER myrefill with password 'refill';
ALTER USER myrefill SUPERUSER;

CREATE DATABASE myrefill;

COMMIT;