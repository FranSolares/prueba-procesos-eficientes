create database if not exists DB_PEPrueba;

use DB_PEPrueba;

create table Vehicle_States(
	idState int auto_increment not null,
    state_name varchar(60),
    state_description varchar(300),
    primary key (idState)
);

create table Vehicles (
	idVehicle int auto_increment not null,
	vehicle_brand varchar(60) not null,
    vehicle_model varchar(60) not null,
    vehicle_year int not null,
    vehicle_plate varchar(60) not null,
    vehicle_state int,
    primary key (idVehicle),
    foreign key (vehicle_state) references Vehicle_States (idState)
);

create table Users (
	idUser int auto_increment not null,
    user_username varchar(20) not null unique,
    user_password varchar(60) not null,
    user_role enum('USER', 'ADMIN') default 'USER',
    primary key (idUser)
);

INSERT INTO Vehicle_States (state_name, state_description) values ('Perfecto', 'Vehiculo en perfecto estado');
INSERT INTO Vehicle_States (state_name, state_description) values ('Daño menor', 'Vehiculo que necesita reparaciones minimas');
INSERT INTO Vehicle_States (state_name, state_description) values ('Reparación urgente', 'Vehiculo que necesita reparación urgente');
INSERT INTO Vehicle_States (state_name, state_description) values ('En reparación', 'Vehiculo en reparación');
INSERT INTO Vehicle_States (state_name, state_description) values ('Descarte', 'Vehiculo a descartar');

INSERT INTO Vehicles (vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state) values ('Tesla', 'S', 2020, 'P-ABC123', 1);
INSERT INTO Vehicles (vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state) values ('Toyota', 'Supra', 2020, 'P-FDJ147', 2);
INSERT INTO Vehicles (vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state) values ('Honda', 'Civic', 2020, 'P-GSW456', 3);
INSERT INTO Vehicles (vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state) values ('BMW', 'M3', 2020, 'Z-XYS425', 4);
INSERT INTO Vehicles (vehicle_brand, vehicle_model, vehicle_year, vehicle_plate, vehicle_state) values ('Mitsubishi', 'Outlander', 2020, 'Z-SDG456', 5);

INSERT INTO Users (user_username, user_password, user_role) values ('ADMIN', '$2b$05$y40ZPqwP8ucaliq.PhKWX.a2uofd0aQ/STMKGKlUc7eUI/UxdNdcC', 'ADMIN');
INSERT INTO Users (user_username, user_password, user_role) values ('USER', '$2b$05$HGgGbTclQ38Sc9Lq3Q3XPeqXJ8tu3Iy5GX6Pl1REAFlYDKbfxJ4aK', 'USER');
