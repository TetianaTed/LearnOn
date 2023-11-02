create table ${schema}.Chapter
(
    id          numeric(19)    not null,
    account_id  numeric(19)    not null,
    name        text  not null,
    description text not null,
    create_date TIMESTAMP(6)  not null default CURRENT_DATE,
    lang1_name  text  not null,
    lang2_name  text  not null
);

alter table ${schema}.CHAPTER
    add primary key (id); --using index;
alter table ${schema}.CHAPTER
    add foreign key (ACCOUNT_ID) references ${schema}.ACCOUNT (ID);
