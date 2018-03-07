import pandas as pd
import numpy as np

pd.options.mode.chained_assignment = None

# Load data
df= pd.read_csv("/Users/anujatike/Documents/sem3/CS235/Project/data/us-traffic-2015/all_records.csv")
df=df[:10000]
sum_Jan_16=0
sum_Feb_13=0
sum_22_May=0
sum_2_Jul=0
sum_4_Sep=0
sum_29_Oct=0
sum_12_Nov=0
sum_25_Nov=0
sum_23_Dec=0
sum_30_Dec=0

# Calculating sum on Holidays
for i in range(0,len(df.axes[0])):
    df['date'].iloc[i] ="1/16/2015"
    sum_Jan_16= sum_Jan_16 + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "2/13/2015"
    sum_Feb_13 = sum_Feb_13 + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "5/22/2015"
    sum_22_May = sum_22_May + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "7/2/2015"
    sum_2_Jul = sum_2_Jul + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "9/4/2015"
    sum_4_Sep = sum_4_Sep + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "10/29/2015"
    sum_29_Oct = sum_29_Oct + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "11/12/2015"
    sum_12_Nov = sum_12_Nov + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "11/25/2015"
    sum_25_Nov = sum_25_Nov + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "12/23/2015"
    sum_23_Dec = sum_23_Dec + df['sum_of_traffic_on_this_date'].iloc[i]

    df['date'].iloc[i] = "12/30/2015"
    sum_30_Dec = sum_30_Dec + df['sum_of_traffic_on_this_date'].iloc[i]


print("Printing sums on holidays: ")
print(sum_Jan_16)
print (sum_Feb_13)
print (sum_22_May)
print (sum_2_Jul)
print (sum_4_Sep)
print (sum_29_Oct)
print (sum_12_Nov)
print (sum_25_Nov)
print (sum_23_Dec)
print (sum_30_Dec)
