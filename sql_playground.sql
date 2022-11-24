insert into fakultas (fakultas) values ("Fakultas Ekonomi"),("Fakultas Hukum"),("Fakultas Teknik"),("Fakultas Sastra"),("Fakultas Kedokteran"),("Fakultas Seni Rupa dan Desain"),("Fakultas Matematika dan Ilmu Pengetahuan Alam"),("Fakultas Ilmu Politik"),("Fakultas Ilmu Pendidikan"),("Fakultas Pariwisata dan Perhotelan"),("Umum");

insert into users (login_id, password, is_admin) values ("A20150177", "$2a$12$Zw6sR0gVQihTF.H9yFE8yOGdnfSVOpadhFLS1S0M4q2/IMPix6tou",1),("A20150178", "$2a$12$c6US9krFcG26s8LAc4mlr.Et5HqwSv3w9nwQHe6FXavaJI6e.mWTO",1);

insert into jurusan (jurusan, fakultas_id) values ("Jurusan Ilmu Ekonomi", 1),("Jurusan Akuntansi", 1),("Jurusan Manajemen",1 ), ("Jurusan Ilmu Hukum",2), ("Jurusan Teknik Sipil", 3),("Jurusan Teknik Elektro", 3),("Jurusan Teknik Mesin", 3),("Jurusan Teknik Metalurgi dan Material", 3),("Jurusan Teknik Kimia", 3),("Jurusan Teknik Industri", 3),("Jurusan Teknik Fisika", 3),("Jurusan Teknik Infromatika", 3),("Jurusan Sastra Indonesia",4),("Jurusan Sastra Inggris",4),("Jurusan Sastra Jerman",4),("Jurusan Pendidikan Kedokteran",5),("Jurusan Seni Rupa Murni",6),("Jurusan Desain Komunikasi Visual",6),("Jurusan Desain Grafis",6),("Jurusan Desain Interior",6),("Jurusan Desain Produk",6),("Jurusan Matematika",7),("Jurusan Fisika",7),("Jurusan Geofisika",7),("Jurusan Kimia",7),("Jurusan Ilmu Politik",8),("Jurusan Pendidikan Bahasa Inggris",9),("Jurusan Pendidikan Matematika",9),("Jurusan Pendidikan Ilmu Pengetahuan Sosial",9),("Jurusan Pendidikan Biologi",9),("Jurusan Pendidikan Kimia",9),("Jurusan Pendidikan Fisika",9),("Jurusan Pendidikan Bahasa dan Sastra Indonesia",9),("Jurusan Manajemen Perhotelan",10),("Jurusan Tata Boga",10),("Mata Kuliah Umum", 11);

INSERT INTO users(login_id,is_admin,password) VALUES
 ('A20150177',1,'$2a$12$Zw6sR0gVQihTF.H9yFE8yOGdnfSVOpadhFLS1S0M4q2/IMPix6tou')
,('A20150178',1,'$2a$12$c6US9krFcG26s8LAc4mlr.Et5HqwSv3w9nwQHe6FXavaJI6e.mWTO')
,('B20160222',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('B20160223',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('B20160224',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('B20160225',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('B20160226',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('B20160227',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('B20160228',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170111',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170112',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170113',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170114',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170115',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170116',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170117',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170118',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170119',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170120',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170121',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170122',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170123',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170124',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170125',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170126',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170127',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK')
,('C20170128',0,'$2a$12$yweAByrVjv2MQZ7miZ39de2JKQcVD7GH/i7qLWsp3KkOh3sCL2DhK');

INSERT INTO mahasiswa(name,id_mahasiswa,alamat,nomor_telepon,fakultas_id,jurusan_id,semester_id) VALUES
 ('Sakura Pertiwi','B20160222','Jalan Merak No 2',628135248951,1,1,12)
,('Harjaya Tamba','B20160223','Jalan Ir Soekarno No 4',628134568412,3,7,12)
,('Utama Wahyudin','B20160224','Jalan Ibu Kita Kartini No 3',628134568413,10,34,12)
,('Latif Hidayanto','B20160225','Jalan Polo AIr No 89',628134568414,2,4,12)
,('Karta Waskita','B20160226','Jalan Tikus No 56',628134568415,4,14,11)
,('Gatra Mahendra','B20160227','Jalan Air Mancur No 3A',628888856423,5,16,11)
,('Kawaya Samosir','B20160228','Jalan WIjaya II No 33',628586789543,7,25,11)
,('Among Jailani','C20170111','Jalan Kuda No 33',628544663215,6,19,10)
,('Akarsana Simanjuntak','C20170112','Jalan Kuning No 44',6258964331432,8,26,10)
,('Erik Dongoran','C20170113','Jalan Jakarta No 9',6852577765125,2,4,10)
,('Asmianto Iswahyudi','C20170114','Jalan Borobudur No 27',653484962128,4,13,10)
,('Baktiadi Utama','C20170115','Jalan Singkong No 45',6286456321664,8,26,10)
,('Kamal Marbun','C20170116','Jalan Pasir Impun No 33',628464865462,6,18,10)
,('Galur Waluyo','C20170117','Jalan Kaki Gajah No 11',6289468487465,7,22,10)
,('Cakrabirawa Kusumo','C20170118','Jalan Biru No 31',6287466946456,2,4,10)
,('Endra Mangunsong','C20170119','Jalan Citarum No 26',6285464864364,1,2,10)
,('Prayogo Maryadi','C20170120','Jalan Salam No 15',6282165464864,2,4,9)
,('Carub Gunarto','C20170121','Jalan Kiara Asri 7 No 6',6285555464313,3,11,9)
,('Ajiman Iswahyudi','C20170122','Jalan Astana Anyar No 8',6289995464613,9,33,9)
,('Luwar Kuswoyo','C20170123','Jalan Patrakomala No 22',683456846464,10,35,9)
,('Gatot Budiman','C20170124','Jalan Lombok No 31',628321931111,8,26,9)
,('Luis Pratama','C20170125','Jalan Kasturi No 9',628532165499,10,34,9)
,('Mustofa Permadi','C20170126','Jalan Kolonel Sugianto No 4',628231346943,2,4,9)
,('Mateo Williams','C20170127','Jalan Moh Toha No 3B',628791364632,3,7,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9);

-- DUMMY
INSERT INTO mahasiswa(name,id_mahasiswa,alamat,nomor_telepon,fakultas_id,jurusan_id,semester_id) VALUES
('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9)
,('Declan Anderson','C20170128','Jalan Pratista No 19',628797966461,5,16,9);

INSERT INTO mata_kuliah(mata_kuliah,mata_kuliah_id,jurusan_id,jumlahSKS,dosen_pengajar,semester_id) VALUES
 ('Ekonomi Makro 1','EKM1',1,3,'Yandi Sugiarto Sumadi',6)
,('Logistik dan Penyediaan','LGDP',2,4,'Gerrie Sampono',5)
,('Tata Negara 3','TNG3',4,6,'Sudiroprojo',7)
,('Termodinamika 2','TRM2',7,5,'Irwan Eka Darmadi',7)
,('Aerodinamik','AERO',11,2,'Ade Hendri Wibowo',7)
,('Linguistik Lanjutan','LGTA',13,5,'Alexander Rangkuti',6)
,('Konsep Literatur','LITE',14,5,'Jurre Benyamin',5)
,('Homeostasis','HMST',16,3,'Sutanto Shing',5)
,('Psikologi Visual','PSKV',18,4,'Maria Denia',7)
,('Ekspresionisme','EKSP',19,5,'Johnny Manurung',8)
,('Probabilitas Murni','PRBM',22,4,'Sudiro Ghandi',5)
,('Ilmu Nuklir 1','NKR1',25,6,'Dana Sumara',5)
,('Pancasila Terapan','PCST',26,3,'Sumarno Projodinegoro',4)
,('Linguistik Relatif','LGSR',33,4,'Benny Kusumo',8)
,('Pengelolaan Anggaran','PGAR',34,4,'Tono Masudi',7)
,('Manajemen Stratejik','STRM',34,3,'I Gusti Ngurah Riatna',6)
,('Gastronomi','GSTR',35,2,'Bambang Jansson',8);



/* INSERT QUERY NO: 1 */
INSERT INTO semester(`Semester`, `start_date`, `end_date`) VALUES
(1, '2023-1-23', '2023-5-15'),
(2, '2023-1-23', '2023-5-15'),
(3, '2023-1-23', '2023-5-15'),
(4, '2023-1-23', '2023-5-15'),
(5, '2023-1-23', '2023-5-15'),
(6, '2023-1-23', '2023-5-15'),
(7, '2023-1-23', '2023-5-15'),
(8, '2023-1-23', '2023-5-15'),
(9, '2023-1-23', '2023-5-15'),
(10, '2023-1-23', '2023-5-15'),
(11, '2023-1-23', '2023-5-15'),
(12, '2023-1-23', '2023-5-15');
