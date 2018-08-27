create table album(
    id serial not null primary key,
    name varchar,
    year integer,
    artist_id integer references artist (id)
);

create table artist(
    id serial not null primary key,
    name varchar
);

create table track(
    id serial not null primary key,
    name varchar,
    album_id integer references album (id),
    duration time
);