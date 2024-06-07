import requests
from bs4 import BeautifulSoup

# URL da página de origem
url = "https://cassiaqueiroz.github.io/teste/"

# URL da página de destino
destination_url = "https://cassiaqueiroz.github.io/ed-queiroz/blog.html"

# Faça uma requisição HTTP para a página de origem
response = requests.get(url)

# Verifique se a resposta foi bem-sucedida
if response.status_code == 200:
    # Parse o conteúdo HTML da página de origem
    soup = BeautifulSoup(response.text, 'html.parser')

    # Encontre todos os posts na página de origem
    posts = soup.find_all('div', {'class': 'post'})

    # Itere sobre os posts e escreva o conteúdo para a página de destino
    for post in posts:
        title = post.find('h2', {'class': 'title'}).text
        content = post.find('div', {'class': 'content'}).text

        # Escreva o conteúdo do post para a página de destino
        with open(destination_url, 'a') as file:
            file.write(f"<h2>{title}</h2>\n<p>{content}</p>\n\n")
else:
    print(f"Erro ao baixar conteúdo: {response.status_code}")