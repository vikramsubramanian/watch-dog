#!/usr/bin/env python
# coding: utf-8

# In[71]:


#As seen from the results below, this table is unwieldy and difficult to use for our requirments. 
#Therefore, this script/notebook contains scripts to convert the source data into a form we like and as described in our reports.
#The data we get from this notebook is used to populate our database


# In[72]:


import pandas as pd
from numpy import nan


# In[73]:


df = pd.read_csv('MCI_2014_to_2019.csv')
btDF = pd.read_csv('BikeTheft_raw.csv')
pdDF = pd.read_csv('PoliceDivision_raw.csv')


# In[74]:


print(df.columns.tolist())
print(btDF.columns.tolist())
print(pdDF.columns.tolist())


# In[75]:


df2_1 = df[[ "occurrencehour", "occurrenceday","occurrencemonth", "occurrenceyear", "occurrencedayofweek"]]
btDFTemp = btDF[["Occurrence_Time", "Occurrence_Day", "Occurrence_Month", "Occurrence_Year"]]
btDFTemp['Occurrence_Time'] = [i.split(':')[0] for i in btDFTemp['Occurrence_Time']]
btDFTemp.insert(loc=4, column="occurrencedayofweek", value=None)
btDFTemp.rename(columns={"Occurrence_Time":"occurrencehour", "Occurrence_Day":"occurrenceday", "Occurrence_Month":"occurrencemonth", "Occurrence_Year":"occurrenceyear"}, inplace=True)
df2_1 = df2_1.append(btDFTemp)
df2_2 = df[["reportedhour", "reportedday","reportedmonth", "reportedyear", "reporteddayofweek"]]
df2_1.rename(columns={"occurrencehour":"hour", "occurrenceday":"day", "occurrencemonth":"month", "occurrenceyear":"year", "occurrencedayofweek":"day_of_week"}, inplace=True)
df2_2.rename(columns={"reportedhour":"hour", "reportedday":"day", "reportedmonth":"month", "reportedyear":"year", "reporteddayofweek":"day_of_week"}, inplace=True)
IncidentTime = df2_1.append(df2_2)
IncidentTime = IncidentTime.drop_duplicates()
IncidentTime = IncidentTime.rename_axis('time_id').reset_index()
IncidentTime['time_id'] += 600000
IncidentTime.to_csv("IncidentTime_prod.csv", index=False)
print(IncidentTime)


# In[76]:


PoliceDivision = pdDF[["DIV", "ADDRESS"]]
PoliceDivision.rename(columns={"DIV":"division", "ADDRESS":"address"}, inplace=True)
PoliceDivision.to_csv("PoliceDivision_prod.csv", index=False)
print(PoliceDivision)


# In[77]:


Neighbourhood = df[["Hood_ID", "Neighbourhood"]]
Neighbourhood = Neighbourhood.append(btDF[["Hood_ID", "Neighbourhood"]])
Neighbourhood = Neighbourhood.drop_duplicates()
Neighbourhood.rename(columns={"Hood_ID":"hood_id", "Neighbourhood":"name"}, inplace=True)
Neighbourhood['name'] = [i.split('(')[0] for i in Neighbourhood['name']]
Neighbourhood.to_csv("Neighbourhood_prod.csv", index=False)
print(Neighbourhood)


# In[78]:


BikeTheft = btDF[["Bike_Colour", "Bike_Make", "Bike_Model", "Bike_Speed", "Bike_Type", "Status", "Cost_of_Bike"]]
BikeTheft.rename(columns={"Bike_Colour":"colour", "Bike_Make":"make", "Bike_Model":"model", "Bike_Speed":"speed", "Bike_Type":"bike_type", "Status":"status", "Cost_of_Bike":"cost"}, inplace=True)
BikeTheft = BikeTheft.rename_axis('bike_theft_id').reset_index()
BikeTheft['bike_theft_id'] += 600000
BikeTheft.to_csv("BikeTheft_prod.csv", index=False)
print(BikeTheft)


# In[79]:


df4 = df[[ "offence", "MCI"]]
df4 = df4.drop_duplicates()
df4 = df4.rename_axis('crimeID').reset_index()
df4['crimeID'] += 100000
df4.to_csv("RegularCrime_prod.csv", index=False)
print(df4)


# In[80]:


df5 = df.merge(df4, on=['offence','MCI'] )
df6 = pd.merge(df5, Neighbourhood, left_on='Hood_ID', right_on='hood_id')
df6.rename(columns={"occurrencehour":"hour", "occurrenceday":"day", "occurrencemonth":"month", "occurrenceyear":"year", "occurrencedayofweek":"day_of_week"}, inplace=True)
df7 = df6.merge(IncidentTime, on=["hour", "day", "month", "year", "day_of_week"])
df13 = IncidentTime.copy()
df13.rename(columns={'time_id': 'reportedTimeID', "hour":"reportedhour", "day":"reportedday", "month":"reportedmonth", "year":"reportedyear", "day_of_week":"reporteddayofweek"}, inplace=True)
df14 = df13.merge(df7, on=["reportedhour", "reportedday","reportedmonth", "reportedyear", "reporteddayofweek"])
df14 = df14[['event_unique_id','crimeID','Hood_ID','time_id','reportedTimeID', "Long", "Lat","premisetype"]]
print(df14)
df14.to_csv("CrimeEvent_prod.csv", index=False)

