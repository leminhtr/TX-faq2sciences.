var vXhr = new XMLHttpRequest();

vXhr.open("POST", "https://kibana4.kelis.fr/~~es/_search");

vXhr.setRequestHeader("Authorization", "Basic " + btoa("kelis:Otm8MSeYkWKL"));