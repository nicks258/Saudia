CREATE TABLE IF NOT EXISTS people(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT ,phonenumber TEXT, email TEXT,image TEXT,sync TEXT);
CREATE TABLE IF NOT EXISTS referEntry(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,phonenumber TEXT,email TEXT,sync TEXT);
INSERT INTO people(name, phonenumber,email,image,sync) VALUES ('Mr sumit', '8144240078','mehra@g.com','image@path','0');
INSERT INTO people(name, phonenumber,email,image,sync) VALUES ('Mr Nicks', '931777777','mery@g.com','imag2@@path','0');
INSERT INTO people(name, phonenumber,email,image,sync) VALUES ('Mr.Ninjs', '888999078','meqwa@g.com','impoag2@@path','0');
INSERT INTO referEntry(name, phonenumber,email,sync) VALUES ('NEO258', '9314871109','n@g.com','0');
