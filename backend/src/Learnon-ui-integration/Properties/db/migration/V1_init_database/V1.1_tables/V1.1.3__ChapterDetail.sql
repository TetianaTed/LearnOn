create table ${schema}.Chapter_Detail
(
    id         numeric not null,
    chapter_id numeric not null,
    word1      text not null,
    word2      text not null
);

alter table ${schema}.CHAPTER_DETAIL
    add primary key (id); --using index;
alter table ${schema}.CHAPTER_DETAIL
    add foreign key (CHAPTER_ID) references ${schema}.CHAPTER (ID);
