import csv

fixed_crime = []
fixed_events = []
with open('RegularCrime.csv') as crime_file:
    with open('CrimeEvents.csv') as event_file:
        crime_reader = csv.reader(crime_file, delimiter=',')
        event_reader = csv.reader(event_file, delimiter=',')

        event_index = 0
        for row in event_reader:
            if event_index == 0:
                print(f'Column names are {", ".join(row)}')
                event_index += 1
            else:
                fixed_events.append(row)
                event_index += 1

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

                # Fix Event IDs
                events_match = [a for a in fixed_events if a[7] == old_crime_id]
                for event in events_match:
                    event[7] = new_crime_id


with open('RegularCrime_new.csv', mode='w') as csv_file:
    crime_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for row in fixed_crime:
        crime_writer.writerow(row)

with open('CrimeEvents_new.csv', mode='w') as csv_file:
    crime_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for row in fixed_events:
        crime_writer.writerow(row)