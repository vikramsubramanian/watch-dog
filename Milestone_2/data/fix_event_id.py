import csv

fixed_crime = []
fixed_bike = []
with open('CrimeEvents_new.csv') as crime_file:
    with open('BikeThefts.csv') as bike_file:
        crime_reader = csv.reader(crime_file, delimiter=',')
        bike_reader = csv.reader(bike_file, delimiter=',')

        bike_index = 0
        for row in bike_reader:
            if bike_index == 0:
                print(f'Column names are {", ".join(row)}')
                bike_index += 1
            else:
                fixed_bike.append(row)
                bike_index += 1

        new_crime_id = 0
        for row in crime_reader:
            if new_crime_id == 0:
                print(f'Column names are {", ".join(row)}')
                new_crime_id += 1
            else:
                new_crime_id += 1
                # print(row)

                # Fix Crime ID
                old_crime_id = row[0]
                row[0] = new_crime_id
                fixed_crime.append(row)

                # Fix Bike IDs
                bikes_match = [a for a in fixed_bike if a[0] == old_crime_id]
                for bike in bikes_match:
                    bike[0] = new_crime_id
                print("At iter: " + str(new_crime_id))

with open('CrimeEvents_new_new.csv', mode='w') as csv_file:
    crime_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for row in fixed_crime:
        crime_writer.writerow(row)

with open('BikeThefts_new.csv', mode='w') as csv_file:
    crime_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for row in fixed_bike:
        crime_writer.writerow(row)