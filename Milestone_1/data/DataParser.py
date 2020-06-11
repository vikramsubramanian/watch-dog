#!/usr/bin/env python
# coding: utf-8

# In[17]:


#As seen from the results below, this table is unwieldy and difficult to use for our requirments. 
#Therefore, this script/notebook contains scripts to convert the source data into a form we like and as described in our reports.
#The data we get from this notebook is used to populate our database


# In[18]:


import pandas as pd


# In[19]:


df = pd.read_csv('data_from_source.csv')


# In[20]:



df.columns.tolist()


# In[21]:


df2 = df[[ "occurrencehour", "occurrenceday","occurrencemonth", "occurrenceyear", "occurrencedayofweek"]]
df2 = df2.drop_duplicates()
df2 = df2.rename_axis('timeID').reset_index()
df2['timeID'] += 600000
df2.to_csv("tableTime.csv")
print(df2)


# In[22]:


df3 = df[[ "premisetype", "Division","Hood_ID", "Neighbourhood"]]
df3 = df3.drop_duplicates()
df3 = df3.rename_axis('locationID').reset_index()
df3['locationID'] += 300000
df3.to_csv("tableLocation.csv")
print(df3)


# In[23]:


df4 = df[[ "offence", "MCI"]]
df4 = df4.drop_duplicates()
df4 = df4.rename_axis('crimeID').reset_index()
df4['crimeID'] += 100000
df4.to_csv("tableCrime.csv")
print(df4)


# In[24]:


df5 = df.merge(df4, on=['offence','MCI'] )
df6 = df5.merge(df3, on=["premisetype", "Division","Hood_ID", "Neighbourhood"])
df7 = df6.merge(df2, on=["occurrencehour", "occurrenceday","occurrencemonth", "occurrenceyear", "occurrencedayofweek"])
df7 = df7[['event_unique_id','crimeID','locationID','timeID', "Long", "Lat"]]
print(df7)
df7.to_csv("tableEvent.csv")


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




