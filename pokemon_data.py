from sys import argv
import pykemon
import json

script = argv

target = open("test.json", 'w')

i = 1
#make requests to the pokemon api to create a json object
datas = []
try:
	while True:
		dataobj = {}
		p = pykemon.get(pokemon_id= i)
		dataobj["name"] = str(p.name)
		dataobj["id"] = str(p.id)
		dataobj["abilities"] = str(p.abilities.keys())
		dataobj["types"] = str(p.types.keys())
		dataobj["gendermfratio"] = str(p.male_female_ratio)
		dataobj["catch_rate"] = str(p.catch_rate)
		datas.append(dataobj);
		i = i + 1
except:
	pass
json.dump(datas, target)
target.close()
