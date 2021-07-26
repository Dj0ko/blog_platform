class RealWorldDbService {
  async getArticlesList(offSet) {
    const res = await fetch(
      `https://conduit.productionready.io/api/articles?offset=${offSet === 1 ? 0 : (offSet - 1) * 5 - 1}&limit=5`
    );

    if (!res.ok) {
      throw new Error();
    }

    const body = await res.json();
    return body;
  }

  async registrationNewUser(data) {
    const newUser = {
      user: data,
    };
    const res = await fetch(`https://conduit.productionready.io/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newUser),
    });

    const body = await res.json();

    return body;
  }

  async loginUser(data) {
    const newUser = {
      user: data,
    };

    const res = await fetch(`https://conduit.productionready.io/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newUser),
    });

    const body = await res.json();

    return body;
  }

  async editProfile(data, token) {
    const newUser = {
      user: data,
    };

    const res = await fetch(`https://conduit.productionready.io/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(newUser),
    });

    const body = await res.json();

    return body;
  }

  async addNewArticle(data, token) {
    const newArticle = {
      article: data,
    };

    const res = await fetch(`https://conduit.productionready.io/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(newArticle),
    });

    const body = await res.json();

    return body;
  }

  async getCurrentArticle(slug) {
    const res = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);

    if (!res.ok) {
      throw new Error();
    }

    const body = await res.json();
    return body;
  }

  async updateArticle(data, slug, token) {
    const newArticle = {
      article: data,
    };

    const res = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(newArticle),
    });

    const body = await res.json();

    return body;
  }

  async deleteArticle(slug, token) {
    const res = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    const body = await res.json();

    return body;
  }
}

const realWorldDbService = new RealWorldDbService();

export default realWorldDbService;
