function HashTable()
{
	this.arrHashTable = [];
    this.clear = apiClear;
    this.containsKey = apiContainsKey;
    this.containsValue = apiContainsValue;
    this.put = apiPut;
    this.get = apiGet;
    this.remove = apiRemove;
    this.keys = apiKeys;
    this.values = apiValues;
    this.isEmpty = apiIsEmpty;   
    this.size = apiSize;
    this.toString = apiToString;
}


function apiClear()
{
    this.arrHashTable = [];
}

function apiContainsKey(key)
{
	if(isKeyValid(key))
    {
	    for (var tmpKey in this.arrHashTable) 
	    {
	        if (tmpKey == key) 
	        {
	            return true;
	        }
	    }
    }
    return false;
}

function apiContainsValue(value)
{
    if (value != null) 
    {
        for (var tmpValue in this.arrHashTable) 
        {
            if (this.arrHashTable[tmpValue] == value) 
            {
                return true;
            }
        }
    }
    return false;
}

function apiPut(key, value)
{
    if(isKeyValid(key))
    {
        this.arrHashTable[key] = value;
    }
}

function apiGet(key)
{
	if(isKeyValid(key))
    {
		return this.arrHashTable[key];
    }
	return undefined;
}


function apiRemove(key)
{
	if(isKeyValid(key))
    {
		var returnValue = this.arrHashTable[key];
		delete this.arrHashTable[key];
		return returnValue;
    }
	return undefined;
}

function apiKeys()
{
    var keys = new Array();
    for (var tmpKey in this.arrHashTable) 
    {
    	keys.push(tmpKey);
    }
    return keys;
}

function apiValues()
{
    var values = new Array();
    for (var tmpValue in this.arrHashTable) 
    {
        if (this.arrHashTable[tmpValue] != null) 
        {
        	values.push(this.arrHashTable[i]);
        }
    }
    return values;
}

function apiIsEmpty()
{
	//check it
    return (this.size() === 0) ? true : false;
}

function apiSize()
{
    var size = 0;
    for (var tmpKey in this.arrHashTable) 
    {
    	size ++;
    }
    return size;
}

function apiToString()
{
    var result = "";
    for (var tmpKey in this.arrHashTable)
    {      
    	result += "{" + tmpKey + "},{" + this.arrHashTable[tmpKey] + "}\n";   
    }
    return result;
}

function isKeyValid(key)
{
	if (!key) 
    {
        throw "key is not valid";
        return false;
    }
	return true;
}
