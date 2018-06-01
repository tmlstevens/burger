create database burgers_db;

use burgers_db;

create table burgers (
    id int auto_increment not null
    ,burger varchar(100)
    ,devoured bool
    ,primary key(id)
);