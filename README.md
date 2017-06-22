# TX - Faq2sciences : Tableau de bord

## Analyse de données pédagogiques dans le contexte Faq2Sciences

### Sujet :
Faq2Sciences (faq2sciences.fr) est une plateforme en ligne éditée par Unisciel et proposant des tests de positionnement pour les matières scientifiques au niveau Bac+1. La plateforme peut être utilisée par des futurs bacheliers ou par des universités partenaires pour conduire des tests de positionnement d'entrée à l'université. Elle inclut un dispositif d'enregistrement de ses données d'utilisation (réponses, scores, tentatives) reposant sur la stack ElasticSearch (Logstash/ElasticSearch).

L'objectif de la TX est d'analyser les données recueillies pour concevoir un tableau de bord à destination des enseignants. Ce tableau doit permettre d'analyser les résultats et comportements des étudiants en ligne. Par exemple, on pourra y visualiser :
 - des résultats par questionnaire/question et par étudiant/groupe d'étudiants
 - des statistiques d'usage (par exemple, répartition des comportements en ligne des étudiants en fonction de la navigation ou du temps de réponse)

Votre tâche consistera dans un premier temps à analyser la nature des données en utilisant par exemple Kibana, l'outil de visualisation de données de la stack ElasticSearch. À ce niveau, un tableau de bord avec les possibilités de Kibana pourra constituer un premier livrable.

Vous concevrez un tableau de bord finalisé en HTML/JS en vue d'une future intégration à Faq2sciences.

La TX est menée en collaboration avec l'éditeur de la suite logicielle libre Scenari (kelis.fr).

## Rendu :

### Fichier
- dashboard.js : Fichier lib contenant le code final
- es_query.js : Liste des query ElasticSearch utlisées
- *.html : page HTML affichant les graphiques

### Framework externe utilisé :
- Plotly.js