create tablespace learnon_ts;
create temporary tablespace learnon_temp_ts;
create user learnon identified by learnon
    default tablespace learnon_ts
    temporary tablespace learnon_temp_ts;

grant create session to learnon;
grant create table to learnon;
grant create view to learnon;
grant create sequence to learnon;
grant create synonym to learnon;

grant unlimited tablespace to learnon;


/*
--on sa
create user learnon with encrypted password 'learnon';
CREATE DATABASE learnon;
grant all privileges on database learnon to learnon;
*/

/*CREATE SCHEMA IF NOT EXISTS ${schema};
SET schema  '${schema}';*/