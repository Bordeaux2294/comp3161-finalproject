#!/bin/bash

# List of SQL files to execute
SQL_FILES=("finalproject00.sql" "finalproject0.sql" "finalproject1.sql" "finalproject2.sql" "finalproject3.sql" "finalproject4.sql" "finalproject5.sql" "finalproject6.sql" "finalproject7.sql" "finalproject8.sql" "finalproject9.sql" "finalproject10.sql" "finalproject11.sql" "finalproject12.sql" "finalproject13.sql" "finalproject14.sql" "finalproject15.sql" "finalproject16.sql" "finalproject17.sql" "finalproject18.sql" "finalproject19.sql" "finalprojectlast.sql")

# MySQL credentials
DB_USER="root"
DB_PASSWORD=""
DB_NAME="school"

# Loop through each SQL file and execute it
for FILE in "${SQL_FILES[@]}"
do
    echo "Executing SQL file: $FILE"
    C:/wamp64/bin/mysql/mysql8.0.31/bin/mysql.exe -u $DB_USER $DB_NAME < $FILE
done

echo "All SQL files executed successfully"
