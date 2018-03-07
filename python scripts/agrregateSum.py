import pandas as pd
import numpy as np

pd.options.mode.chained_assignment = None

# Load data
df= pd.read_csv("/Users/anujatike/Documents/sem3/CS235/Project/data/us-traffic-2015/all_records.csv")

#Taking avegerage of sum of traffic to compare with the traffic on holidays
average=df["sum_of_traffic_on_this_date"].mean()
print("Average of sum of traffic is :")
print(average)