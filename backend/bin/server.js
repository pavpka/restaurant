const http = require('http');
const express = require('express');
const path = require('path');
const pg = require('pg');
const app = express();
const cors = require('cors');
let FoundData = [];
let FoundSchedule = [];
let cooks = 0;
const bodyParser = require('body-parser');
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'qwerty27',
    database: 'restaurant',
    max: 5
});
/*
let i;
const names = ['\'Alexander\'', '\'Victor\'', '\'Oleg\'', '\'Pavel\'', '\'Sergey\'', '\'Alexey\'', '\'Nikolay\'', '\'Vladislav\'', '\'Andrey\'', '\'Dmitriy\'', '\'Egor\''];
const surnames =['\'Ivanov\'', '\'Petrov\'', '\'Lebedev\'', '\'Smirnov\'', '\'Sokolov\'','\'Popov\'', '\'Morozov\''];
const patronymics =['\'Igorevich\'', '\'Pavlovich\'', '\'Fedorovich\'', '\'Semenovich\'', '\'Alexandrovich\'', '\'Sergeevich\''];
let randShift, randRusCui, randItCui, randJapCui, randHours, randSch;
pool.connect((err, db, done) => {
    if (err){
        console.log(err);
    }
    else {
        db.query ('TRUNCATE cook');
        for (i=0; i<100; i++) {
            randShift=Math.random()+1;
            randRusCui=Math.random();
            randItCui=Math.random();
            randJapCui=Math.random();
            randSch=Math.random()+1;
            randHours=Math.random()*6+4;
            db.query("INSERT INTO cook (surname, name, patronymic, work_shift, schedule, russian_cuisine, italian_cuisine, japanese_cuisine, hours) VALUES ("+surnames[i%surnames.length]+","+names[i%names.length]+", "+patronymics[i%patronymics.length]+", " + randShift+","+randSch+","+randRusCui+","+randItCui+","+randJapCui+","+randHours+") RETURNING id", (err, table) => {
                if (err) {
                    return console.log(err);
                }
                else {
                    console.log(table)
                }
            })
        }
    }
});
*/

pool.connect((err, db, done) => {
    let date, id, start, end, cook, workTime, nameDB, surnameDB, patronymicDB;
    let node = 0;
    let free = [];
    let day = [];
    let countHours = [];
    if (err) {
        console.log(err);
    }
    else {


        db.query("SELECT * FROM cook", (err, table) => {
            if (err) {
                return console.log(err);
            }
            else {
                for (id = 0; id < 100; id++) {
                    free[id] = [];
                    if (table.rows[id].schedule === 1)
                        day[id] = 5;
                    else day[id] = 2;
                    for (date = 0; date < 30; date++) {
                        free[id][date] = true;
                    }
                    //console.log(day[id]);
                }
            }
        });

        //input to schedule
        db.query("SELECT * FROM cook", (err, table) => {
            if (err) {
                return console.log(err);
            }
            else {
                db.query('TRUNCATE restaurant1');
                for (date = 0; date < 30; date++) {
                    countHours[date] = [];
                    for (var cuisine = 0; cuisine < 3; cuisine++) {

                        countHours[date][cuisine] = 0;
                    }
                    for (id = 0; id < 100; id++) {
                        cook = table.rows[id];
                        while (countHours[date][0] < 7) {
                            if (cook.work_shift === 1 && cook.russian_cuisine === 1 && day[id] > 0 && free[id][date]) {
                                start = 10 + countHours[date][0];
                                free[id][date] = false;
                                countHours[date][0] += cook.hours;
                                end = 10 + countHours[date][0];
                                workTime = '\'' + start + ':00 - ' + end + ':00\'';
                                nameDB = '\'' + cook.name + '\'';
                                surnameDB = '\'' + cook.surname + '\'';
                                patronymicDB = '\'' + cook.patronymic + '\'';
                                db.query("INSERT INTO restaurant1 (id_node, day, surname, name, patronymic, work_shift,cuisine, work_time) VALUES (" + node + ", " + date + ", " + surnameDB + ", " + nameDB + ", " + patronymicDB + ", " + cook.work_shift + ", 'rus', " + workTime + ")", (err, table) => {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    else {
                                    }
                                });
                                node++;
                            }
                            else break;
                        }
                        while (countHours[date][1] < 7) {
                            if (cook.work_shift === 1 && cook.italian_cuisine === 1 && day[id] > 0 && free[id][date]) {
                                start = 10 + countHours[date][1];
                                free[id][date] = false;
                                countHours[date][1] += cook.hours;
                                end = 10 + countHours[date][1];
                                workTime = '\'' + start + ':00 - ' + end + ':00\'';
                                nameDB = '\'' + cook.name + '\'';
                                surnameDB = '\'' + cook.surname + '\'';
                                patronymicDB = '\'' + cook.patronymic + '\'';
                                db.query("INSERT INTO restaurant1 (id_node, day, surname, name, patronymic, work_shift,cuisine, work_time) VALUES (" + node + ", " + date + ", " + surnameDB + ", " + nameDB + ", " + patronymicDB + ", " + cook.work_shift + ", 'it', " + workTime + ")", (err, table) => {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    else {
                                    }
                                });
                                node++;
                            }
                            else break;
                        }
                        while (countHours[date][2] < 7) {
                            if (cook.work_shift === 1 && cook.japanese_cuisine === 1 && day[id] > 0 && free[id][date]) {
                                start = 10 + countHours[date][2];
                                free[id][date] = false;
                                countHours[date][2] += cook.hours;
                                end = 10 + countHours[date][2];
                                workTime = '\'' + start + ':00 - ' + end + ':00\'';
                                nameDB = '\'' + cook.name + '\'';
                                surnameDB = '\'' + cook.surname + '\'';
                                patronymicDB = '\'' + cook.patronymic + '\'';
                                db.query("INSERT INTO restaurant1 (id_node, day, surname, name, patronymic, work_shift,cuisine, work_time) VALUES (" + node + ", " + date + ", " + surnameDB + ", " + nameDB + ", " + patronymicDB + ", " + cook.work_shift + ", 'jap', " + workTime + ")", (err, table) => {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    else {
                                    }
                                });
                                node++;
                            }
                            else break;
                        }
                        if (day[id] > -2) day[id]--;
                        else {
                            if (cook.schedule === 1) day[id] += 7;
                            else day[id] += 4;
                        }
                        if (countHours[date][0] >= 7 && countHours[date][1] >= 7 && countHours[date][2] >= 7) break;
                    }

                    for (id = 0; id < 100; id++) {
                        cook = table.rows[id];
                        while (countHours[date][0] < 14) {
                            if (cook.work_shift === 2 && cook.russian_cuisine === 1 && day[id] > 0 && free[id][date]) {
                                if (countHours[date][0] < 7) countHours[date][0] = 7;
                                start = 10 + countHours[date][0];
                                free[id][date] = false;
                                if (start + cook.hours > 24) end = 24;
                                else end = start + cook.hours;
                                countHours[date][0] += cook.hours;
                                workTime = '\'' + start + ':00 - ' + end + ':00\'';
                                nameDB = '\'' + cook.name + '\'';
                                surnameDB = '\'' + cook.surname + '\'';
                                patronymicDB = '\'' + cook.patronymic + '\'';
                                db.query("INSERT INTO restaurant1 (id_node, day, surname, name, patronymic, work_shift,cuisine, work_time) VALUES (" + node + ", " + date + ", " + surnameDB + ", " + nameDB + ", " + patronymicDB + ", " + cook.work_shift + ", 'rus', " + workTime + ")", (err, table) => {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    else {
                                    }
                                });
                                node++;
                            }
                            else break;
                        }
                        while (countHours[date][1] < 14) {
                            if (cook.work_shift === 2 && cook.italilan_cuisine === 1 && day[id] > 0 && free[id][date]) {
                                if (countHours[date][1] < 7) countHours[date][1] = 7;
                                start = 10 + countHours[date][1];
                                free[id][date] = false;
                                if (start + cook.hours > 24) end = 24;
                                else end = start + cook.hours;
                                countHours[date][1] += cook.hours;
                                workTime = '\'' + start + ':00 - ' + end + ':00\'';
                                nameDB = '\'' + cook.name + '\'';
                                surnameDB = '\'' + cook.surname + '\'';
                                patronymicDB = '\'' + cook.patronymic + '\'';
                                db.query("INSERT INTO restaurant1 (id_node, day, surname, name, patronymic, work_shift,cuisine, work_time) VALUES (" + node + ", " + date + ", " + surnameDB + ", " + nameDB + ", " + patronymicDB + ", " + cook.work_shift + ", 'it', " + workTime + ")", (err, table) => {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    else {
                                    }
                                });
                                node++;
                            }
                            else break;
                        }
                        while (countHours[date][2] < 14) {
                            if (cook.work_shift === 2 && cook.japanese_cuisine === 1 && day[id] > 0 && free[id][date]) {
                                if (countHours[date][2] < 7) countHours[date][2] = 7;
                                start = 10 + countHours[date][2];
                                free[id][date] = false;
                                if (start + cook.hours > 24) end = 24;
                                else end = start + cook.hours;
                                countHours[date][2] += cook.hours;
                                workTime = '\'' + start + ':00 - ' + end + ':00\'';
                                nameDB = '\'' + cook.name + '\'';
                                surnameDB = '\'' + cook.surname + '\'';
                                patronymicDB = '\'' + cook.patronymic + '\'';
                                db.query("INSERT INTO restaurant1 (id_node, day, surname, name, patronymic, work_shift,cuisine, work_time) VALUES (" + node + ", " + date + ", " + surnameDB + ", " + nameDB + ", " + patronymicDB + ", " + cook.work_shift + ", 'jap', " + workTime + ")", (err, table) => {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    else {
                                    }
                                });
                                node++;
                            }
                            else break;
                        }
                        if (countHours[date][0] >= 14 && countHours[date][1] >= 14 && countHours[date][2] >= 14) break;
                    }
                }
            }
        });
    }
});

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("ok");
});
app.post('/cooks', (req, res) => {
    res.send(req.body);
    let foundName = '\'' + req.body.name + '\'';
    let foundSurname = '\'' + req.body.surname + '\'';
    pool.connect((err, db, done) => {
        if (err) {
            console.log(err);
        }
        else {
            db.query("SELECT * FROM cook WHERE name = " + foundName + " AND surname = " + foundSurname + "", (err, table) => {
                if (err) {
                    return console.log(err);
                }
                else {

                    let i = 0;
                    while (i < table.rowCount) {
                        FoundData[i] = table.rows[i];
                        console.log(FoundData[i]);
                        i++;
                    }
                }
            });
        }
    });
});
app.get('/cooks', (req, res) => {
    //console.log(FoundData.length);
    res.send(FoundData);
});

app.post('/', (req, res) => {
    res.send(req.body);
    let addName = '\'' + req.body.name + '\'';
    let addSurame = '\'' + req.body.surname + '\'';
    let addPatronymic = '\'' + req.body.patronymic + '\'';
    pool.connect((err, db, done) => {
        if (err) {
            console.log(err);
        }
        else {
            db.query("INSERT INTO cook (surname, name, patronymic, work_shift, schedule, russian_cuisine, italian_cuisine, japanese_cuisine, hours) VALUES (" + addSurame + ", " + addName + ", " + addPatronymic + ", " + req.body.work_shift + ", " + req.body.schedule + ", " + req.body.rus_cuisine + ", " + req.body.it_cuisine + ", " + req.body.jap_cuisine + ", " + req.body.hours + ") RETURNING id", (err, table) => {
                if (err) {
                    return console.log(err);
                }
                else {
                    console.log("add to db");
                }
            });
        }
    });
});

app.post('/schedule', (req, res) => {
    res.send(req.body);
    console.log(req.body.number);
    pool.connect((err, db, done) => {
        if (err) {
            console.log(err);
        }
        else {
            db.query("SELECT * FROM restaurant1", (err, table) => {
                if (err) {
                    return console.log(err);
                }
                else {

                    let i = 0;
                    while (i < table.rowCount) {
                        FoundSchedule[i] = table.rows[i];
                        console.log(FoundSchedule[i]);
                        i++;
                    }
                }
            });
        }
    });
});
app.get('/schedule', (req,res)=>{
    res.send(FoundSchedule);
});
const port = process.env.PORT || 3001;
app.listen(port);

console.log('App is listening on port ' + port);