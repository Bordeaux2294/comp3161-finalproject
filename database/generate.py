from faker import Faker
from faker.providers import DynamicProvider
import random
import string
import time
fake = Faker()

start = time.time()

# Generate a list of at least 200 courses
comp_names = ["Advanced Topics in Artificial Intelligence", "Computer Graphics and Visualization", "Distributed Systems and Networking", "Machine Learning for Data Analysis", "Natural Language Processing", "Advanced Topics in Computer Security", "Web Application Development", "High-Performance Computing", "Software Engineering and Design Patterns", "Cloud Computing Architecture and Infrastructure", "Database Management Systems", "Computer Vision and Image Processing", "Mobile Application Development", "Computer Networks and Communications", "Cryptography and Network Security", "Data Mining and Knowledge Discovery", "Parallel and Distributed Algorithms", "Human-Computer Interaction", "Advanced Data Structures and Algorithms", "Operating Systems and System Programming", "Artificial Intelligence and Machine Learning Ethics", "Advanced Topics in Human-Robot Interaction", "Computer Systems Architecture", "Embedded Systems Design and Programming", "Quantum Computing and Quantum Information", "Artificial Intelligence and Computer Vision for Robotics", "Computational Science and Engineering", "Intelligent Information Retrieval", "Advanced Topics in Computer Vision", "Formal Methods in Software Engineering", "Computer Science and Society", "Cybersecurity Threats and Defense", "Computational Linguistics and Machine Translation", "Robotics and Autonomous Systems", "Programming Languages and Compilers", "Software Testing and Verification", "Advanced Computer Networks and Distributed Systems", "Computer Science and Game Design", "Machine Learning for Medical Applications", "Advanced Topics in Blockchain and Cryptocurrencies"]
math_names = ["Introduction to Mathematical Analysis", "Linear Algebra and Its Applications", "Calculus and Differential Equations", "Foundations of Mathematics", "Probability and Statistics", "Graph Theory and Combinatorics", "Abstract Algebra and Number Theory", "Topology and Geometry", "Real Analysis and Measure Theory", "Mathematical Modeling and Simulation", "Partial Differential Equations", "Numerical Methods and Scientific Computing", "Discrete Mathematics and Logic", "Game Theory and Applications", "Algebraic Geometry and Cryptography", "Functional Analysis and Applications", "Complex Analysis and Applications", "Mathematical Optimization and Operations Research", "Stochastic Processes and Applications", "Mathematical Finance and Risk Management", "Nonlinear Differential Equations and Chaos Theory", "Algebraic Topology and Homological Algebra", "Dynamical Systems and Ergodic Theory", "Probability Theory and Stochastic Analysis", "Mathematics Education and Pedagogy", "Harmonic Analysis and Wavelet Theory", "Geometric Analysis and Partial Differential Equations", "Mathematical Biology and Ecology", "Coding Theory and Cryptography", "Representation Theory and Lie Algebras", "Knot Theory and Low-Dimensional Topology", "Mathematical Physics and Quantum Mechanics", "Analytic Number Theory and Diophantine Equations", "Classical and Modern Geometry", "Mathematical Logic and Model Theory", "Algebraic Combinatorics and Combinatorial Optimization", "Algebraic Number Theory and Arithmetic Geometry", "Homotopy Theory and Algebraic Topology", "Mathematical Structures and Algorithms", "History of Mathematics and Foundations of Mathematical Thought"]
bio_names  = ["Cellular and Molecular Biology", "Genetics and Genomics", "Evolutionary Biology", "Ecology and Conservation Biology", "Microbiology and Immunology", "Neurobiology and Behavior", "Physiology and Biophysics", "Developmental Biology", "Biostatistics and Bioinformatics", "Biochemistry and Biomolecular Structure", "Plant Biology and Botany", "Animal Behavior and Communication", "Biotechnology and Genetic Engineering", "Environmental Science and Sustainability", "Systems Biology and Computational Biology", "Human Anatomy and Physiology", "Marine Biology and Oceanography", "Medical Microbiology and Infectious Diseases", "Cancer Biology and Oncology", "Bioethics and Biomedical Ethics", "Zoology and Animal Diversity", "Biomedical Imaging and Biophotonics", "Developmental Neurobiology and Aging", "Biogeography and Biodiversity", "Epigenetics and Gene Regulation", "Immunology and Vaccinology", "Molecular Genetics and Gene Editing", "Metabolic Pathways and Bioenergetics", "Plant Genetics and Epigenetics", "Stem Cells and Regenerative Medicine", "Evolutionary Ecology and Conservation Genetics", "Molecular Medicine and Personalized Medicine", "Bioprocessing and Biomanufacturing", "Systems Neuroscience and Brain Function", "Comparative Physiology and Adaptation", "Aquatic Ecology and Limnology", "Biochemistry of Metabolism and Signaling", "Molecular Basis of Disease and Therapy", "Plant-Microbe Interactions and Symbiosis", "Ecological Modeling and Data Analysis"]
phys_names = ["Classical Mechanics and Dynamics", "Quantum Mechanics and Applications", "Electromagnetism and Waves", "Thermodynamics and Statistical Mechanics", "Solid State Physics and Materials Science", "Optics and Photonics", "Nuclear and Particle Physics", "Plasma Physics and Fusion Energy", "Astrophysics and Cosmology", "Biophysics and Medical Physics", "Condensed Matter Physics and Nanoscience", "Fluid Mechanics and Aerodynamics", "Mathematical Methods in Physics", "Experimental Techniques and Instrumentation", "Relativity and Gravitation", "Nonlinear Dynamics and Chaos Theory", "Quantum Field Theory and Particle Physics", "Quantum Computing and Information", "Quantum Optics and Quantum Electronics", "High Energy Astrophysics and Compact Objects", "Quantum Gravity and Black Holes", "Soft Matter Physics and Complex Systems", "Atomic and Molecular Physics", "Optical Spectroscopy and Imaging", "Quantum Information Theory and Cryptography", "Nanophotonics and Metamaterials", "Particle Accelerators and High-Energy Physics", "Physics of Energy and Environment", "Neutron and X-ray Scattering", "Superconductivity and Quantum Materials", "Classical and Quantum Chaos in Dynamical Systems", "Renewable Energy and Energy Conversion", "Gravitational Waves and Cosmological Inflation", "Quantum Computing and Quantum Algorithms", "Environmental Physics and Climate Change", "Photonics and Information Technology", "Quantum Foundations and Interpretations", "Theoretical Nuclear Physics and Applications", "Atomic Physics and Quantum Optics", "Computational Physics and High-Performance Computing"]
stat_names = ["Introduction to Probability Theory and Statistics", "Statistical Inference and Hypothesis Testing", "Linear Regression and Generalized Linear Models", "Experimental Design and Analysis of Variance", "Multivariate Statistical Analysis and Data Mining", "Nonparametric Statistics and Robust Methods", "Time Series Analysis and Forecasting", "Statistical Learning and Data Science", "Bayesian Statistics and Decision Theory", "Categorical Data Analysis and Logistic Regression", "Survival Analysis and Reliability","Introduction to Statistics 1" , "Introduction to Statistics 2" ,"Introduction to Statistics 3" ,"Introduction to Statistics 4", "Spatial Statistics and Geostatistics", "Statistical Computing and Graphics", "Design of Experiments and Response Surface Methodology", "Applied Regression Analysis and Mixed Models", "Stochastic Processes and Queuing Theory", "Statistical Genetics and Genomics", "Sampling Theory and Survey Design", "Financial Econometrics and Time Series Analysis", "Experimental Methods in Social Science Research", "Machine Learning and Neural Networks", "Medical Statistics and Clinical Trials", "Statistical Quality Control and Six Sigma", "Statistical Process Control and Reliability Engineering", "Big Data Analytics and High-Dimensional Data", "Environmental Statistics and Risk Assessment", "Advanced Bayesian Modeling and Computation", "Statistical Programming and Data Visualization", "Multilevel Modeling and Hierarchical Data Analysis", "Spatial Econometrics and Geographic Information Systems", "Business Analytics and Operations Research", "Nonlinear Regression and Generalized Additive Models", "Spatial and Temporal Modeling of Ecological Data", "Applied Multivariate Analysis and Dimension Reduction", "Meta-Analysis and Systematic Review", "Statistical Disclosure Control and Confidentiality"]

courses = []
course_pairs = []
for i in range(40):
    num = str(int(i+1))
    courses.append('COMP' +num)
    course_pairs.append(['COMP'+ num ,comp_names[i]])

for i in range(40):
    num = str(int(i+1))
    courses.append('MATH' +num)
    course_pairs.append(['MATH' +num ,math_names[i]])

for i in range(40):
    num = str(int(i+1))
    courses.append(('BIO' +str(i+1)))
    course_pairs.append(['BIO' +num,bio_names[i]])

for i in range(40):
    num = str(int(i+1))
    courses.append('PHYS' +num)
    course_pairs.append(['PHYS' +num ,phys_names[i]])

for i in range(40):
    num = str(int(i+1))
    courses.append('STAT' +num)
    course_pairs.append(['STAT' +num,stat_names[i]])

def phonenum_create():
    p1 = str(random.randint(1,999)).zfill(3)
    p2 = str(random.randint(1,9999)).zfill(4)
    return '876-' + p1 + '-' + p2


def pwdgenerator(length):

    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits

    all_chars = lowercase + uppercase + digits
    
    password = ''.join(random.choices(all_chars, k=length))
    return password


uid_count = 1
staff_count = 1
eid_count = 1

admin_members = []
lecturer_members = []
student_members = []

#person = [uid, sid/stid, utype, sname, address, tele, email, password , [cids]]

for x in range(20):
    name = fake.name()
    split = name.split(' ')
    mail_list = ['@yahoo.com', '@gmail.com', '@hotmail.com', '@mymona.uwi.edu']
    email = split[0] + '.' + split[1] + random.choice(mail_list) 
    admin = [uid_count, staff_count, 'Admin', name, fake.address(), phonenum_create(), email, pwdgenerator(12), []]
    admin_members.append(admin)
    uid_count += 1
    staff_count += 1

#person = [uid, sid/stid, utype, sname, address, tele, email, password , [cids]]

for x in range (40):
    name = fake.name()
    split = name.split(' ')
    mail_list = ['@yahoo.com', '@gmail.com', '@hotmail.com', '@mymona.uwi.edu']
    email = split[0] + '.' + split[1] + random.choice(mail_list) 
    num_courses = random.randint(1, 5)
    lecturer_courses = random.sample(courses, num_courses)
    lecturer = [uid_count, staff_count, 'Lecturer', name, fake.address(), phonenum_create(), email, pwdgenerator(12), lecturer_courses]
    lecturer_members.append(lecturer)
    uid_count += 1
    staff_count += 1


students = [fake.name() for _ in range(200000)]

student_courses = {}
for student in students:
    num_courses = random.randint(3, 6)
    student_courses[student] = random.sample(courses, num_courses)

    # Ensure each course has at least 10 members
course_students = {}
for course in courses:
    num_students = random.randint(10, 20)
    while len(course_students.get(course, [])) < num_students:
        student = random.choice(students)
        if len(student_courses[student]) < 6 and course not in student_courses[student]:
            course_students.setdefault(course, []).append(student)
            student_courses[student].append(course)

s_list = list(student_courses.items())

student_count = uid_count + 1

for stu in s_list:
    name = stu[0]
    stu_courses = stu[1]
    split = name.split(' ')
    mail_list = ['@yahoo.com', '@gmail.com', '@hotmail.com', '@mymona.uwi.edu']
    email = split[0] + '.' + split[1] + random.choice(mail_list) 
    student = [uid_count, student_count, 'Student', name, fake.address(), phonenum_create(), email, pwdgenerator(12), stu_courses]
    student_members.append(student)
    uid_count += 1
    student_count += 1


# for admin in admin_members:
#     print(admin)

# for lecturer in lecturer_members:
#     print(lecturer)


#print(student_members)
#print(len(student_courses))


queries = []
total_members = len(student_members) + len(lecturer_members) + len(admin_members)

#person = [uid[0], sid/stid[1], utype[2], sname[3], address[4], tele[5], email[6], password[7], [cids[8]]]

for student in student_members:
    query = "INSERT INTO student (sid, sname, saddr, stele, semail) VALUES  ('{}', '{}', '{}', '{}', '{}');".format(student[1], student[3], student[4] ,student[5], student[6])
    queries.append(query)

for lecturer in lecturer_members:
    query = "INSERT INTO staff (stid, stname, staddr, sttele, stemail) VALUES  ('{}','{}', '{}', '{}', '{}');".format(lecturer[1], lecturer[3], lecturer[4] ,lecturer[5], lecturer[6])
    queries.append(query)




for admin in admin_members:
    query = "INSERT INTO users (uid, upwd, utype, uemail) VALUES  ('{}','{}', '{}', '{}');".format(admin[0], admin[7], admin[2], admin[6])
    queries.append(query)


for lecturer in lecturer_members:
    query = "INSERT INTO users (uid, upwd, utype, uemail) VALUES  ('{}','{}', '{}', '{}');".format(lecturer[0], lecturer[7], lecturer[2], lecturer[6])
    queries.append(query)

for student in student_members:
    query = "INSERT INTO users (uid, upwd, utype, uemail) VALUES  ('{}','{}', '{}', '{}');".format(student[0], student[7], student[2], student[6])
    queries.append(query)

#person = [uid[0], sid/stid[1], utype[2], sname[3], address[4], tele[5], email[6], password[7], [cids[8]]]


for lecturer in lecturer_members:
    for course in lecturer[8]:
        query = "INSERT INTO enroll (eid, uid, cid, etype) VALUES  ('{}','{}', '{}', '{}');".format(eid_count, lecturer[0], course, lecturer[2])
        eid_count += 1
        queries.append(query)


for student in student_members:
    for course in student[8]:
        query = "INSERT INTO enroll (eid, uid, cid, etype) VALUES  ('{}','{}', '{}', '{}');".format(eid_count, student[0], course, student[2])
        eid_count += 1
        queries.append(query)


n = 20
sublist_size = len(queries) // n
sublists = [queries[i:i+sublist_size] for i in range(0, len(queries), sublist_size)]




queries2 =[]

for i in range(200):
    query = "INSERT INTO course (cid, ctitle) VALUES  ('{}', '{}');".format(course_pairs[i][0], course_pairs[i][1])
    queries2.append(query)


Header1 = ['DROP DATABASE IF EXISTS school;', 'CREATE DATABASE school;', 'USE school;']

Tables= [
    "CREATE TABLE student(sid int PRIMARY KEY NOT NULL AUTO_INCREMENT,sname varchar(150),saddr varchar(255),stele varchar(255),semail varchar(255));",
    "CREATE TABLE course(cid varchar(100) PRIMARY KEY NOT NULL, ctitle varchar(255));",
    "CREATE TABLE staff( stid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  stname varchar(255), staddr varchar(255),  sttele varchar(255), stemail varchar(255));",
    "CREATE TABLE users( uid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  upwd varchar(255), utype varchar(255),   uemail varchar(255));",
    "CREATE TABLE enroll(eid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  uid int,  cid varchar(100),  etype varchar(255), FOREIGN KEY (uid) REFERENCES users(uid), FOREIGN KEY (cid) REFERENCES course(cid));",
    "CREATE TABLE grades( eid int PRIMARY KEY NOT NULL,   grade int);",
    "CREATE TABLE section(seid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  cid varchar(100),  secname varchar(255), FOREIGN KEY (cid) REFERENCES course(cid));",
    "CREATE TABLE sectionitem(ssid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  seid int,  uid int,  content varchar(255), ssdatecreated datetime, FOREIGN KEY (seid) REFERENCES section(seid),  FOREIGN KEY (uid) REFERENCES users(uid));",
    "CREATE TABLE discussionforum(fid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  cid varchar(100),  fname varchar(255),  fdatecreated datetime,  fthreadamt int, FOREIGN KEY (cid) REFERENCES course(cid));",
    "CREATE TABLE discussionthread(tid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  fid int,   cid varchar(100),  uid int,  tname varchar(255),  tdatecreated datetime,   treplyamount int,FOREIGN KEY (cid) REFERENCES course(cid),FOREIGN KEY (fid) REFERENCES discussionforum(fid),FOREIGN KEY (uid) REFERENCES users(uid));",
    "CREATE TABLE reply(rid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  tid int,  fid int,  cid varchar(100),  uid int,  rname varchar(255),  rdatecreated datetime,  rreplyamount int,parent_rid int DEFAULT NULL,FOREIGN KEY (cid) REFERENCES course(cid),FOREIGN KEY (fid) REFERENCES discussionforum(fid),FOREIGN KEY (tid) REFERENCES discussionthread(tid));",
    "CREATE TABLE assignment(aid int PRIMARY KEY NOT NULL AUTO_INCREMENT, sid int,cid varchar(100),aname varchar(255), agrade int, adatesubmitted datetime,FOREIGN KEY (cid) REFERENCES course(cid), FOREIGN KEY (sid) REFERENCES student(sid));",
    "CREATE TABLE event(evid int primary key NOT NULL AUTO_INCREMENT, cid varchar(100), uid int, ename varchar(255), edatecreated datetime, edateofevent datetime, FOREIGN KEY (cid) REFERENCES course(cid));"
]


with open('finalproject00.sql', 'w') as sqlfile:
    sqlfile.write('\n'.join(Header1))
    sqlfile.write('\n')
    sqlfile.write('\n')
    sqlfile.write('\n'.join(Tables))


for x in range(n):
    file = 'finalproject'+str(x)+'.sql'
    with open(file, 'w') as sqlfile:
        sqlfile.write('\n'.join(sublists[x]))

with open('finalprojectlast.sql', 'w') as sqlfile:
    sqlfile.write('\n'.join(queries2))



end = time.time()


#print(courses)
#print (len(queries))
print("Completed in: ", end - start)