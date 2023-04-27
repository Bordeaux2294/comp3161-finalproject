SELECT uid, COUNT(*) AS num_courses
FROM enroll
GROUP BY uid
HAVING num_courses > 6;

SELECT s.sname, e.uid, COUNT(*) AS num_courses
FROM enroll e
JOIN student s ON s.sid = e.uid
GROUP BY e.uid
HAVING num_courses < 3;

SELECT enroll.cid, COUNT(*) AS num_students
FROM enroll
GROUP BY enroll.cid
HAVING num_students < 10;

SELECT staff.stid, staff.stname, COUNT(*) AS num_courses
FROM staff
JOIN enroll ON staff.stid = enroll.uid
GROUP BY staff.stid, staff.stname
HAVING num_courses > 5;

SELECT staff.stid, staff.stname, COUNT(*) AS num_courses
FROM staff
JOIN enroll ON staff.stid = enroll.uid
GROUP BY staff.stid, staff.stname
HAVING num_courses = 0;


SELECT staff.stid, staff.stname, COUNT(*) AS num_courses
FROM staff
JOIN enroll ON staff.stid = enroll.uid
WHERE enroll.etype = 'Lecturer'
GROUP BY staff.stid, staff.stname
HAVING num_courses < 1;



