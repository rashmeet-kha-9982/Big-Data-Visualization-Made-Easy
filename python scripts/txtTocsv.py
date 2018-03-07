import csv
import itertools

with open("/Users/anujatike/Documents/sem3/CS235/Project/data/us-traffic-2015/dot_traffic_2015.txt", "r") as txt_file:
    with open("/Users/anujatike/Documents/sem3/CS235/Project/data/us-traffic-2015/new_data.csv", 'w+', newline='') as csv_file:
        in_txt = csv.reader(txt_file, delimiter=',')
        out_csv = csv.writer(csv_file)
        out_csv.writerows(in_txt)
