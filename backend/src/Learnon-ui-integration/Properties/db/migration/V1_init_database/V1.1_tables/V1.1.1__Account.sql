CREATE SCHEMA IF NOT EXISTS ${schema};
SET schema  '${schema}';

create table ${schema}.Account
(
    id         numeric(19)   not null,
    first_name text not null,
    last_name  text not null,
    email      text not null,
    password   text not null,
    birth_date DATE,
    gender     text not null,
    avatar_url text
);

alter table ${schema}.ACCOUNT
    add primary key (id); --using index;
alter table ${schema}.ACCOUNT
    add unique (email);
--alter table ${schema}.ACCOUNT add check (instr(email, '@') > 0);