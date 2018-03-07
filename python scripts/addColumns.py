
import pandas as pd
import numpy as np

pd.options.mode.chained_assignment = None

# Load data
df= pd.read_csv("/Users/anujatike/Documents/sem3/CS235/Project/data/us-traffic-2015/new_data copy.csv")

#df=df[:1500]

# Adding column "month_name_of_data"
df['month_name_of_data'] = np.where(df.month_of_data == 1, 'January',
                           np.where(df.month_of_data == 2,'February',
                           np.where(df.month_of_data == 3,'March',
                           np.where(df.month_of_data == 4,'April',
                           np.where(df.month_of_data == 5,'May',
                           np.where(df.month_of_data == 6,'June',
                           np.where(df.month_of_data == 7,'July',
                           np.where(df.month_of_data == 8,'August',
                           np.where(df.month_of_data == 9,'September',
                           np.where(df.month_of_data == 10,'October',
                           np.where(df.month_of_data == 11,'November',
                           np.where(df.month_of_data == 12,'December','None')))))))))))) 

# Adding column "day_name_of_week"
df['day_name_of_week'] = np.where(df.day_of_week == 1, 'Sunday',
                           np.where(df.day_of_week == 2,'Monday',
                           np.where(df.day_of_week == 3,'Tuesday',
                           np.where(df.day_of_week == 4,'Wednesday',
                           np.where(df.day_of_week == 5,'Thursday',
                           np.where(df.day_of_week == 6,'Friday',
                           np.where(df.day_of_week == 7,'Saturday', None)))))))

# Adding column "sum_of_traffic_on_this_date"
df['sum_of_traffic_on_this_date']= df['traffic_volume_counted_after_0000_to_0100']+ \
                                   df['traffic_volume_counted_after_0100_to_0200']+ \
                                   df['traffic_volume_counted_after_0200_to_0300']+ \
                                   df['traffic_volume_counted_after_0300_to_0400']+\
                                   df['traffic_volume_counted_after_0400_to_0500']+\
                                   df['traffic_volume_counted_after_0500_to_0600']+\
                                   df['traffic_volume_counted_after_0600_to_0700']+\
                                    df['traffic_volume_counted_after_0700_to_0800']+\
                                    df['traffic_volume_counted_after_0800_to_0900']+\
                                    df['traffic_volume_counted_after_0900_to_1000']+\
                                    df['traffic_volume_counted_after_1000_to_1100']+\
                                    df['traffic_volume_counted_after_1100_to_1200']+\
                                    df['traffic_volume_counted_after_1200_to_1300']+\
                                    df['traffic_volume_counted_after_1300_to_1400']+\
                                    df['traffic_volume_counted_after_1400_to_1500']+\
                                    df['traffic_volume_counted_after_1500_to_1600']+\
                                    df['traffic_volume_counted_after_1600_to_1700']+\
                                    df['traffic_volume_counted_after_1700_to_1800']+\
                                    df['traffic_volume_counted_after_1800_to_1900']+\
                                    df['traffic_volume_counted_after_1900_to_2000']+\
                                    df['traffic_volume_counted_after_2000_to_2100']+\
                                    df['traffic_volume_counted_after_2100_to_2200']+\
                                    df['traffic_volume_counted_after_2200_to_2300']+\
                                    df['traffic_volume_counted_after_2300_to_2400']


# Adding column "state_names"
df['state_names'] = np.where(df.fips_state_code == 1, 'AL',
                           np.where(df.fips_state_code == 2,'AK',
                           np.where(df.fips_state_code == 3,'FIPS 5-1 reserved code',
                           np.where(df.fips_state_code == 4,'AZ',
                           np.where(df.fips_state_code == 5,'AR',
                           np.where(df.fips_state_code == 6,'CA',
                           np.where(df.fips_state_code == 7,'(FIPS 5-1 reserved code)',
                           np.where(df.fips_state_code == 8,'CO',
                           np.where(df.fips_state_code == 9,'CT',
                           np.where(df.fips_state_code == 10,'DE',
                           np.where(df.fips_state_code == 11,'DC',
                           np.where(df.fips_state_code == 12,'FL',
                           np.where(df.fips_state_code == 13, 'GA',
                           np.where(df.fips_state_code == 14,'(FIPS 5-1 reserved code)',
                           np.where(df.fips_state_code == 15,'HI',
                           np.where(df.fips_state_code == 16,'ID',
                           np.where(df.fips_state_code == 17,'IL',
                           np.where(df.fips_state_code == 18,'IN',
                           np.where(df.fips_state_code == 19,'IA',
                           np.where(df.fips_state_code == 20,'KS',
                           np.where(df.fips_state_code == 21,'KY',
                           np.where(df.fips_state_code == 22,'LA',
                           np.where(df.fips_state_code == 23,'ME',
                           np.where(df.fips_state_code == 24,'MD',
                           np.where(df.fips_state_code == 25, 'MA',
                           np.where(df.fips_state_code == 26,'MI',
                           np.where(df.fips_state_code == 27,'MN',
                           np.where(df.fips_state_code == 28,'MS',
                           np.where(df.fips_state_code == 29,'MO',
                           np.where(df.fips_state_code == 30,'MT',
                           np.where(df.fips_state_code == 31,'NE',
                           np.where(df.fips_state_code == 32,'NV',
                           np.where(df.fips_state_code == 33,'NH',
                           np.where(df.fips_state_code == 34,'NJ',
                           np.where(df.fips_state_code == 35,'NM',
                           np.where(df.fips_state_code == 36,'NY',
                           np.where(df.fips_state_code == 37, 'NC',
                           np.where(df.fips_state_code == 38,'ND',
                           np.where(df.fips_state_code == 39,'OH',
                           np.where(df.fips_state_code == 40,'OK',
                           np.where(df.fips_state_code == 41,'OR',
                           np.where(df.fips_state_code == 42,'PA',
                           np.where(df.fips_state_code == 43,'(FIPS 5-1 reserved code)',
                           np.where(df.fips_state_code == 44,'RI',
                           np.where(df.fips_state_code == 45,'SC',
                           np.where(df.fips_state_code == 46,'SD',
                           np.where(df.fips_state_code == 47,'TN',
                           np.where(df.fips_state_code == 48,'TX',
                           np.where(df.fips_state_code == 49,'UT',
                           np.where(df.fips_state_code == 50,'VT',
                           np.where(df.fips_state_code == 51,'VA',
                           np.where(df.fips_state_code == 52,'(FIPS 5-1 reserved code)',
                           np.where(df.fips_state_code == 53,'WA',
                           np.where(df.fips_state_code == 54,'WV',
                           np.where(df.fips_state_code == 55,'WI',
                           np.where(df.fips_state_code == 56,'WY','None'))))))))))))))))))))))))))))))))))))))))))))))))))))))))


# Adding column "state_names_full"
df['state_names_full'] = np.where(df.fips_state_code == 1, 'Alabama',
                           np.where(df.fips_state_code == 2,'Alaska',
                           np.where(df.fips_state_code == 3,'FIPS 5-1 reserved code',
                           np.where(df.fips_state_code == 4,'Arizona',
                           np.where(df.fips_state_code == 5,'Arkansas',
                           np.where(df.fips_state_code == 6,'California',
                           np.where(df.fips_state_code == 7,'(FIPS 5-1 reserved code)',
                           np.where(df.fips_state_code == 8,'Colorado',
                           np.where(df.fips_state_code == 9,'Connecticut',
                           np.where(df.fips_state_code == 10,'Delaware',
                           np.where(df.fips_state_code == 11,'District of Columbia',
                           np.where(df.fips_state_code == 12,'Florida',
                           np.where(df.fips_state_code == 13, 'Georgia',
                           np.where(df.fips_state_code == 14,'(FIPS 5-1 reserved code)',
                           np.where(df.fips_state_code == 15,'Hawaii',
                           np.where(df.fips_state_code == 16,'Idaho',
                           np.where(df.fips_state_code == 17,'Illinois',
                           np.where(df.fips_state_code == 18,'Indiana',
                           np.where(df.fips_state_code == 19,'Iowa',
                           np.where(df.fips_state_code == 20,'Kansas',
                           np.where(df.fips_state_code == 21,'Kentucky',
                           np.where(df.fips_state_code == 22,'Louisiana',
                           np.where(df.fips_state_code == 23,'Maine',
                           np.where(df.fips_state_code == 24,'Maryland',
                           np.where(df.fips_state_code == 25, 'Massachusetts',
                           np.where(df.fips_state_code == 26,'Michigan',
                           np.where(df.fips_state_code == 27,'Minnesota',
                           np.where(df.fips_state_code == 28,'Mississippi',
                           np.where(df.fips_state_code == 29,'Missouri',
                           np.where(df.fips_state_code == 30,'Montana',
                           np.where(df.fips_state_code == 31,'Nebraska',
                           np.where(df.fips_state_code == 32,'Nevada',
                           np.where(df.fips_state_code == 33,'New Hampshire',
                           np.where(df.fips_state_code == 34,'New Jersey',
                           np.where(df.fips_state_code == 35,'New Mexico',
                           np.where(df.fips_state_code == 36,'New York',
                           np.where(df.fips_state_code == 37, 'North Carolina',
                           np.where(df.fips_state_code == 38,'North Dakota',
                           np.where(df.fips_state_code == 39,'Ohio',
                           np.where(df.fips_state_code == 40,'Oklahoma',
                           np.where(df.fips_state_code == 41,'Oregon',
                           np.where(df.fips_state_code == 42,'Pennsylvania',
                           np.where(df.fips_state_code == 43,'(FIPS 5-1 reserved code)',
                           np.where(df.fips_state_code == 44,'Rhode Island',
                           np.where(df.fips_state_code == 45,'South Carolina',
                           np.where(df.fips_state_code == 46,'South Dakot',
                           np.where(df.fips_state_code == 47,'Tennessee',
                           np.where(df.fips_state_code == 48,'Texas',
                           np.where(df.fips_state_code == 49,'Utah',
                           np.where(df.fips_state_code == 50,'Vermont',
                           np.where(df.fips_state_code == 51,'Virginia',
                           np.where(df.fips_state_code == 52,'(FIPS 5-1 reserved code)',
                           np.where(df.fips_state_code == 53,'Washington',
                           np.where(df.fips_state_code == 54,'West Virginia',
                           np.where(df.fips_state_code == 55,'Wisconsin',
                           np.where(df.fips_state_code == 56,'Wyoming','None'))))))))))))))))))))))))))))))))))))))))))))))))))))))))

#Writing data to CSV file
df.to_csv("/Users/anujatike/Documents/sem3/CS235/Project/data/us-traffic-2015/all_records.csv", sep=',', encoding='utf-8')


