# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# from bs4 import BeautifulSoup
# import openai

# app = Flask(__name__)
# CORS(app)

# # Set your API keys
# openai.api_key = "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"
# google_api_key = "AIzaSyAvi5Rh7f8XcfswW0AfMhYocT8gx0JpABc"
# google_cx = "d7083f93bff594e74" # Custom Search Engine ID


# def google_search(query):
#     """Perform a Google search and return top URLs."""
#     url = f"https://www.googleapis.com/customsearch/v1"
#     params = {
#         "q": query,
#         "key": google_api_key,
#         "cx": google_cx,
#         "num": 10, # Number of results to fetch
#     }
#     response = requests.get(url, params=params)
#     results = response.json()
#     urls = [item['link'] for item in results.get('items', [])]
#     return urls


# def fetch_content(url):
#     """Fetch content from a given URL."""
#     try:
#         response = requests.get(url)
#         soup = BeautifulSoup(response.content, 'html.parser')
#         paragraphs = soup.find_all('p')
#         content = ' '.join(p.get_text() for p in paragraphs[:10]) # Limit to the first 10 paragraphs
#         return content
#     except Exception as e:
#         return f"Error fetching content: {e}"


# def summarize_content(content):
#     """Summarize the content using OpenAI API."""
#     try:
#         response = openai.Completion.create(
#             engine="text-davinci-003",
#             prompt=f"Summarize this research work:\n\n{content}",
#             max_tokens=150,
#             temperature=0.7
#         )
#         return response.choices[0].text.strip()
#     except Exception as e:
#         return f"Error summarizing content: {e}"


# @app.route('/analyze-research', methods=['POST'])
# def analyze_research():
#     data = request.json
#     doctor_name = data.get('doctor_name', '')

#     # Perform a Google search
#     query = f"{doctor_name} research work"
#     search_results = google_search(query)

#     # Fetch and summarize content from the top URLs
#     summaries = []
#     for url in search_results:
#         content = fetch_content(url)
#         if content:
#             summary = summarize_content(content)
#             summaries.append({"url": url, "summary": summary})
#         else:
#             summaries.append({"url": url, "summary": "Failed to fetch or summarize content."})

#     return jsonify(summaries)


# if __name__ == "__main__":
#     app.run(debug=True)
















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# from bs4 import BeautifulSoup
# import openai

# app = Flask(__name__)
# CORS(app)

# # Set your API keys
# openai.api_key = "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"
# google_api_key = "AIzaSyAvi5Rh7f8XcfswW0AfMhYocT8gx0JpABc"
# google_cx = "d7083f93bff594e74"  # Custom Search Engine ID


# def google_search(query):
#     """Perform a Google search and return top URLs."""
#     url = f"https://www.googleapis.com/customsearch/v1"
#     params = {
#         "q": query,
#         "key": google_api_key,
#         "cx": google_cx,
#         "num": 10,  # Number of results to fetch
#     }
#     response = requests.get(url, params=params)
#     results = response.json()
#     urls = [item['link'] for item in results.get('items', [])]
#     return urls


# def fetch_content(url):
#     """Fetch content from a given URL."""
#     try:
#         response = requests.get(url)
#         soup = BeautifulSoup(response.content, 'html.parser')
#         paragraphs = soup.find_all('p')
#         content = ' '.join(p.get_text() for p in paragraphs[:10])  # Limit to the first 10 paragraphs
#         return content
#     except Exception as e:
#         return f"Error fetching content: {e}"


# def summarize_content(content):
#     """Summarize the content using OpenAI API."""
#     try:
#         response = openai.Completion.create(
#             engine="text-davinci-003",
#             prompt=f"Summarize this research work:\n\n{content}",
#             max_tokens=150,
#             temperature=0.7
#         )
#         return response.choices[0].text.strip()
#     except Exception as e:
#         return f"Error summarizing content: {e}"


# @app.route('/analyze-research', methods=['POST'])
# def analyze_research():
#     data = request.json
#     doctor_name = data.get('doctor_name', '')

#     # Perform a Google search
#     query = f"{doctor_name} research work"
#     search_results = google_search(query)

#     # If no search results are found, return a specific message
#     if not search_results:
#         return jsonify([{"url": "N/A", "summary": "No research papers found for this doctor."}])

#     # Fetch and summarize content from the top URLs
#     summaries = []
#     for url in search_results:
#         content = fetch_content(url)
#         if content:
#             summary = summarize_content(content)
#             summaries.append({"url": url, "summary": summary})
#         else:
#             summaries.append({"url": url, "summary": "Failed to fetch or summarize content."})

#     return jsonify(summaries)


# if __name__ == "__main__":
#     app.run(debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# from bs4 import BeautifulSoup
# from openai import OpenAI  # Updated import for OpenAI >= 1.0.0

# app = Flask(__name__)
# CORS(app)

# # Initialize OpenAI client
# client = OpenAI(api_key="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")

# # Set your Google API keys
# google_api_key = "AIzaSyAvi5Rh7f8XcfswW0AfMhYocT8gx0JpABc"
# google_cx = "d7083f93bff594e74"  # Custom Search Engine ID


# def google_search(query):
#     """Perform a Google search and return top URLs."""
#     url = f"https://www.googleapis.com/customsearch/v1"
#     params = {
#         "q": query,
#         "key": google_api_key,
#         "cx": google_cx,
#         "num": 4,  # Number of results to fetch
#     }
#     response = requests.get(url, params=params)
#     results = response.json()
#     urls = [item['link'] for item in results.get('items', [])]
#     return urls


# def fetch_content(url):
#     """Fetch content from a given URL."""
#     try:
#         response = requests.get(url)
#         soup = BeautifulSoup(response.content, 'html.parser')
#         paragraphs = soup.find_all('p')
#         content = ' '.join(p.get_text() for p in paragraphs[:10])  # Limit to the first 10 paragraphs
#         return content
#     except Exception as e:
#         return f"Error fetching content: {e}"


# def summarize_content(content):
#     """Summarize the content using OpenAI API."""
#     try:
#         response = client.chat.completions.create(
#             model="gpt-3.5-turbo",  # Use the appropriate model
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant."},
#                 {"role": "user", "content": f"Summarize this research work:\n\n{content}"},
#             ],
#             max_tokens=150,
#             temperature=0.7,
#         )
#         return response.choices[0].message.content.strip()
#     except Exception as e:
#         return f"Error summarizing content: {e}"


# @app.route('/analyze-research', methods=['POST'])
# def analyze_research():
#     data = request.json
#     doctor_name = data.get('doctor_name', '')

#     # Perform a Google search
#     query = f"{doctor_name} research work"
#     search_results = google_search(query)

#     # If no search results are found, return a specific message
#     if not search_results:
#         return jsonify([{"url": "N/A", "summary": "No research papers found for this doctor."}])

#     # Fetch and summarize content from the top URLs
#     summaries = []
#     for url in search_results:
#         content = fetch_content(url)
#         if content and not content.startswith("Error fetching content:"):
#             summary = summarize_content(content)
#             summaries.append({"url": url, "summary": summary})
#         else:
#             summaries.append({"url": url, "summary": "Failed to fetch or summarize content."})

#     return jsonify(summaries)


# if __name__ == "__main__":
#     app.run(debug=True)











# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# from bs4 import BeautifulSoup
# from openai import OpenAI  # Updated import for OpenAI >= 1.0.0

# app = Flask(__name__)
# CORS(app)

# # Initialize OpenAI client
# client = OpenAI(api_key="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")

# # Set your Google API keys
# google_api_key = "AIzaSyAvi5Rh7f8XcfswW0AfMhYocT8gx0JpABc"
# google_cx = "d7083f93bff594e74"  # Custom Search Engine ID


# def google_search(query):
#     """Perform a Google search and return top URLs."""
#     url = f"https://www.googleapis.com/customsearch/v1"
#     params = {
#         "q": query,
#         "key": google_api_key,
#         "cx": google_cx,
#         "num": 4,  # Number of results to fetch
#     }
#     response = requests.get(url, params=params)
#     results = response.json()
#     urls = [item['link'] for item in results.get('items', [])]
#     return urls


# def fetch_content(url):
#     """Fetch content from a given URL."""
#     try:
#         # Skip LinkedIn and Quora URLs as they are not suitable for summarization
#         if "linkedin.com" in url or "quora.com" in url:
#             return None

#         response = requests.get(url)
#         soup = BeautifulSoup(response.content, 'html.parser')

#         # Extract text from common HTML tags
#         text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
#         content = ' '.join(element.get_text() for element in text_elements)

#         # Return None if the content is too short or irrelevant
#         if len(content.split()) < 50:  # Minimum 50 words
#             return None

#         return content
#     except Exception as e:
#         print(f"Error fetching content from {url}: {e}")
#         return None


# def summarize_content(content):
#     """Summarize the content using OpenAI API."""
#     try:
#         response = client.chat.completions.create(
#             model="gpt-3.5-turbo",  # Use the appropriate model
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant that summarizes research work."},
#                 {"role": "user", "content": f"Summarize this research work in 2-3 sentences:\n\n{content}"},
#             ],
#             max_tokens=150,
#             temperature=0.7,
#         )
#         return response.choices[0].message.content.strip()
#     except Exception as e:
#         print(f"Error summarizing content: {e}")
#         return None


# @app.route('/analyze-research', methods=['POST'])
# def analyze_research():
#     data = request.json
#     doctor_name = data.get('doctor_name', '')

#     # Perform a Google search
#     query = f"{doctor_name} research paper"
#     search_results = google_search(query)

#     # If no search results are found, return a specific message
#     if not search_results:
#         return jsonify([{"url": "N/A", "summary": "No research papers found for this doctor."}])

#     # Fetch and summarize content from the top URLs
#     summaries = []
#     for url in search_results:
#         content = fetch_content(url)
#         if content:
#             summary = summarize_content(content)
#             if summary:
#                 summaries.append({"url": url, "summary": summary})
#             else:
#                 summaries.append({"url": url, "summary": "Failed to summarize content."})
#         else:
#             summaries.append({"url": url, "summary": "Failed to fetch or irrelevant content."})

#     # If no summaries were generated, return a default message
#     if not summaries:
#         return jsonify([{"url": "N/A", "summary": "No relevant research papers found for this doctor."}])

#     return jsonify(summaries)


# if __name__ == "__main__":
#     app.run(debug=True)

















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# from bs4 import BeautifulSoup
# from openai import OpenAI  # Updated import for OpenAI >= 1.0.0

# app = Flask(__name__)
# CORS(app)

# # Initialize OpenAI client
# client = OpenAI(api_key="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")

# # Set your Google API keys
# google_api_key = "AIzaSyAvi5Rh7f8XcfswW0AfMhYocT8gx0JpABc"
# google_cx = "d7083f93bff594e74"  # Custom Search Engine ID


# def google_search(query):
#     """Perform a Google search and return top URLs."""
#     url = f"https://www.googleapis.com/customsearch/v1"
#     params = {
#         "q": query,
#         "key": google_api_key,
#         "cx": google_cx,
#         "num": 4,  # Number of results to fetch
#     }
#     response = requests.get(url, params=params)
#     results = response.json()
#     urls = [item['link'] for item in results.get('items', [])]
#     return urls


# def fetch_content(url):
#     """Fetch content from a given URL."""
#     try:
#         # Skip LinkedIn and Quora URLs as they are not suitable for summarization
#         if "linkedin.com" in url or "quora.com" in url:
#             return None

#         response = requests.get(url)
#         soup = BeautifulSoup(response.content, 'html.parser')

#         # Extract text from common HTML tags
#         text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
#         content = ' '.join(element.get_text() for element in text_elements)

#         # Return None if the content is too short or irrelevant
#         if len(content.split()) < 50:  # Minimum 50 words
#             return None

#         return content
#     except Exception as e:
#         print(f"Error fetching content from {url}: {e}")
#         return None


# def summarize_content(content):
#     """Summarize the content using OpenAI API."""
#     try:
#         response = client.chat.completions.create(
#             model="gpt-4o-mini",  # Use the appropriate model
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant that summarizes research work."},
#                 {"role": "user", "content": f"Summarize this research work in 2-3 sentences:\n\n{content}"},
#             ],
#             max_tokens=150,
#             temperature=0.7,
#         )
#         return response.choices[0].message.content.strip()
#     except Exception as e:
#         print(f"Error summarizing content: {e}")
#         return None


# @app.route('/analyze-research', methods=['POST'])
# def analyze_research():
#     data = request.json
#     doctor_name = data.get('doctor_name', '')

#     # Perform a Google search
#     query = f"{doctor_name} research work"
#     search_results = google_search(query)

#     # If no search results are found, return a specific message
#     if not search_results:
#         return jsonify([{"url": "N/A", "summary": "No research papers found for this doctor."}])

#     # Fetch and summarize content from the top URLs
#     summaries = []
#     for url in search_results:
#         try:
#             content = fetch_content(url)
#             if content:
#                 summary = summarize_content(content)
#                 if summary:
#                     summaries.append({"url": url, "summary": summary})
#                 else:
#                     print(f"Skipping {url}: Failed to summarize content.")
#             else:
#                 print(f"Skipping {url}: Failed to fetch or irrelevant content.")
#         except Exception as e:
#             print(f"Skipping {url} due to error: {e}")
#             continue  # Skip to the next URL if an error occurs

#     # If no summaries were generated, return a default message
#     if not summaries:
#         return jsonify([{"url": "N/A", "summary": "No relevant research papers found for this doctor."}])

#     return jsonify(summaries)


# if __name__ == "__main__":
#     app.run(debug=True)









from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from openai import OpenAI  # Updated import for OpenAI >= 1.0.0

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key="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")

# Set your Google API keys
google_api_key = "AIzaSyCuYbMJb9gmaoZ_83qpy3offSaZAPKXqn8"
google_cx = "30e5aa7764ec74b54"  # Custom Search Engine ID


def google_search(query):
    """Perform a Google search and return top URLs."""
    url = f"https://www.googleapis.com/customsearch/v1"
    params = {
        "q": query,
        "key": google_api_key,
        "cx": google_cx,
        "num": 3,  # Number of results to fetch
    }
    response = requests.get(url, params=params)
    results = response.json()
    urls = [item['link'] for item in results.get('items', [])]
    return urls


def fetch_content(url):
    """Fetch content from a given URL."""
    try:
        # Skip LinkedIn and Quora URLs as they are not suitable for summarization
        if "linkedin.com" in url or "quora.com" in url:
            return None

        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract text from common HTML tags
        text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        content = ' '.join(element.get_text() for element in text_elements)

        # Return None if the content is too short or irrelevant
        if len(content.split()) < 50:  # Minimum 50 words
            return None

        return content
    except Exception as e:
        print(f"Error fetching content from {url}: {e}")
        return None


def summarize_content(content):
    """Summarize the content using OpenAI API."""
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Use the appropriate model
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes research work."},
                {"role": "user", "content": f"Summarize this research work in 2-3 sentences:\n\n{content}"},
            ],
            max_tokens=150,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error summarizing content: {e}")
        return None


@app.route('/analyze-research', methods=['POST'])
def analyze_research():
    data = request.json
    doctor_name = data.get('doctor_name', '')

    # Perform a Google search
    query = f"{doctor_name} research work"
    search_results = google_search(query)

    # If no search results are found, return a specific message
    if not search_results:
        return jsonify([{"url": "N/A", "summary": "No research papers found for this doctor."}])

    # Fetch and summarize content from the top URLs
    summaries = []
    for url in search_results:
        try:
            content = fetch_content(url)
            if content:
                summary = summarize_content(content)
                if summary:
                    summaries.append({"url": url, "summary": summary})
                else:
                    print(f"Skipping {url}: Failed to summarize content.")
            else:
                print(f"Skipping {url}: Failed to fetch or irrelevant content.")
        except Exception as e:
            print(f"Skipping {url} due to error: {e}")
            continue  # Skip to the next URL if an error occurs

    # If no summaries were generated, return a default message
    if not summaries:
        return jsonify([{"url": "N/A", "summary": "No relevant research papers found for this doctor."}])

    return jsonify(summaries)


if __name__ == "__main__":
    app.run(debug=True)






















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# from bs4 import BeautifulSoup
# from openai import OpenAI  # Updated import for OpenAI >= 1.0.0

# app = Flask(__name__)
# CORS(app)

# # Initialize OpenAI client
# client = OpenAI(api_key="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")

# # Set your Google API keys
# google_api_key = "AIzaSyCuYbMJb9gmaoZ_83qpy3offSaZAPKXqn8"
# google_cx = "30e5aa7764ec74b54"  # Custom Search Engine ID


# def google_search(query):
#     """Perform a Google search and return top URLs."""
#     url = f"https://www.googleapis.com/customsearch/v1"
#     params = {
#         "q": query,
#         "key": google_api_key,
#         "cx": google_cx,
#         "num": 3,  # Number of results to fetch
#     }
#     response = requests.get(url, params=params)
#     results = response.json()
#     urls = [item['link'] for item in results.get('items', [])]
#     print("Search Results:", urls)  # Debugging: Print search results
#     return urls


# def fetch_content(url):
#     """Fetch content from a given URL."""
#     try:
#         # Skip LinkedIn and Quora URLs as they are not suitable for summarization
#         if "linkedin.com" in url or "quora.com" in url:
#             return None

#         # Add headers to mimic a real browser request
#         headers = {
#             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
#         }
#         response = requests.get(url, headers=headers, timeout=10)
#         soup = BeautifulSoup(response.content, 'html.parser')

#         # Extract text from common HTML tags
#         text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
#         content = ' '.join(element.get_text() for element in text_elements)

#         # Return None if the content is too short or irrelevant
#         if len(content.split()) < 50:  # Minimum 50 words
#             return None

#         print(f"Content from {url}:", content[:200])  # Debugging: Print first 200 characters of content
#         return content
#     except Exception as e:
#         print(f"Error fetching content from {url}: {e}")
#         return None


# def summarize_content(content):
#     """Summarize the content using OpenAI API."""
#     try:
#         response = client.chat.completions.create(
#             model="gpt-3.5-turbo",  # Use the appropriate model
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant that summarizes research work."},
#                 {"role": "user", "content": f"Summarize this research work in 2-3 sentences:\n\n{content}"},
#             ],
#             max_tokens=150,
#             temperature=0.7,
#         )
#         summary = response.choices[0].message.content.strip()
#         print(f"Summary for content:", summary)  # Debugging: Print the summary
#         return summary
#     except Exception as e:
#         print(f"Error summarizing content: {e}")
#         return None


# @app.route('/analyze-research', methods=['POST'])
# def analyze_research():
#     data = request.json
#     doctor_name = data.get('doctor_name', '')

#     # Perform a Google search
#     query = f"{doctor_name} research work"
#     search_results = google_search(query)

#     # If no search results are found, return a specific message
#     if not search_results:
#         return jsonify([{"url": "N/A", "summary": "No research papers found for this doctor."}])

#     # Fetch and summarize content from the top URLs
#     summaries = []
#     for url in search_results:
#         try:
#             content = fetch_content(url)
#             if content:
#                 summary = summarize_content(content)
#                 if summary:
#                     summaries.append({"url": url, "summary": summary})
#                 else:
#                     print(f"Skipping {url}: Failed to summarize content.")
#             else:
#                 print(f"Skipping {url}: Failed to fetch or irrelevant content.")
#         except Exception as e:
#             print(f"Skipping {url} due to error: {e}")
#             continue  # Skip to the next URL if an error occurs

#     # If no summaries were generated, return a default message
#     if not summaries:
#         return jsonify([{"url": "N/A", "summary": "No relevant research papers found for this doctor."}])

#     return jsonify(summaries)


# if __name__ == "__main__":
#     app.run(debug=True)