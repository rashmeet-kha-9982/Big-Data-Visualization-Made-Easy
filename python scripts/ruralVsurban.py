import pandas as pd
import numpy as np

pd.options.mode.chained_assignment = None

# Load data
df= pd.read_csv("/Users/anujatike/Documents/sem3/CS235/Project/data/us-traffic-2015/all_records.csv")

df['functional_classification_name'] = df['functional_classification_name'].astype(str)

for i in range(0,len(df.axes[0])):

    # Replace all rows containing "*Rural*" by "Rural"
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace('Rural: Major Collector','Rural')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Rural: Minor Arterial', 'Rural')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Rural: Minor Collector', 'Rural')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Rural: Principal Arterial - Interstate', 'Rural')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Rural: Principal Arterial - Other', 'Rural')

    # Replace all rows containing "*Urban*" by "Urban"
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Urban: Minor Arterial', 'Urban')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Urban: Principal Arterial - Interstate', 'Urban')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Urban: Principal Arterial - Other', 'Urban')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Urban: Principal Arterial - Other Freeways or Expressways', 'Urban')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Urban: Minor Arterial', 'Urban')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Urban: Minor Arterial', 'Urban')
    df['functional_classification_name'].iloc[i] = df['functional_classification_name'].iloc[i].replace(
        'Urban Freeways or Expressways', 'Urban')

# Writing new data to csv file
df.to_csv("/Users/anujatike/Documents/sem3/CS235/Project/data/us-traffic-2015/all_records_final.csv", sep=',', encoding='utf-8')

#Dropping unnecessary columns from data
df.drop(['direction_of_travel','functional_classification','lane_of_travel'], axis=1)

# Writing new data to csv file
df.to_csv("/Users/anujatike/Desktop/all_records_final.csv", sep=',', encoding='utf-8')