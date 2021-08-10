class RealWorldDbService {
  // apiBase = `https://conduit.productionready.io/api`;

  apiBase = `https://conduit-api-realworld.herokuapp.com/api`;

  // Проверяем авторизован ли пользователь или нет
  getToken() {
    if (JSON.parse(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).token;
    }
    return null;
  }

  // Функция, получающая список статей
  async getArticlesList(page) {
    const res = await fetch(
      `${this.apiBase}/articles?offset=${page === 1 ? 0 : (page - 1) * 5 - 1}&limit=5`,
      this.getToken()
        ? {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              Authorization: `Token ${this.getToken()}`,
            },
          }
        : null
    );

    if (!res.ok) {
      throw new Error();
    }

    const body = await res.json();

    return body;
  }

  // Функция, регистрирующая нового пользователя
  async registrationNewUser(data) {
    const newUser = {
      user: data,
    };

    const res = await fetch(`${this.apiBase}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newUser),
    });

    const body = await res.json();

    return body;
  }

  // Функция, для логина пользователя
  async loginUser(data) {
    const newUser = {
      user: data,
    };

    const res = await fetch(`${this.apiBase}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newUser),
    });

    const body = await res.json();

    return body;
  }

  // Функция для редактирования профиля(для авторизованных пользователей)
  async editProfile(data) {
    const newUser = {
      user: data,
    };

    const res = await fetch(
      `${this.apiBase}/user`,
      this.getToken()
        ? {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Token ${this.getToken()}`,
            },
            body: JSON.stringify(newUser),
          }
        : null
    );

    const body = await res.json();

    return body;
  }

  // Функция добавления новой статьи(для авторизованных пользователей)
  async addNewArticle(data) {
    const newArticle = {
      article: data,
    };

    const res = await fetch(
      `${this.apiBase}/articles`,
      this.getToken()
        ? {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Token ${this.getToken()}`,
            },
            body: JSON.stringify(newArticle),
          }
        : null
    );

    const body = await res.json();

    return body;
  }

  // Функция, получающая заданную статью
  async getCurrentArticle(slug) {
    const res = await fetch(
      `${this.apiBase}/articles/${slug}`
      // , {
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8',
      //     Authorization: `Token ${this.token}`,
      //   }
      //   }
    );

    if (!res.ok) {
      throw new Error();
    }

    const body = await res.json();
    return body;
  }

  // Функия для редактирования статьи(для авторизованных пользователей)
  async updateArticle(data, slug) {
    const newArticle = {
      article: data,
    };

    const res = await fetch(
      `${this.apiBase}/articles/${slug}`,
      this.getToken()
        ? {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Token ${this.getToken()}`,
            },
            body: JSON.stringify(newArticle),
          }
        : null
    );

    const body = await res.json();

    return body;
  }

  // Функция для удаления статьи(для авторизованных пользователей)
  async deleteArticle(slug) {
    const res = await fetch(
      `${this.apiBase}/articles/${slug}`,
      this.getToken()
        ? {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Token ${this.getToken()}`,
            },
          }
        : null
    );

    const body = await res.json();

    return body;
  }

  // Функция для добавления отметки "Мне нравится"(для авторизованных пользователей)
  async rateArticle(slug) {
    const res = await fetch(
      `${this.apiBase}/articles/${slug}/favorite`,
      this.getToken()
        ? {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Token ${this.getToken()}`,
            },
          }
        : null
    );

    const body = await res.json();

    return body;
  }

  // Функция для удаления отметки "Мне нравится"(для авторизованных пользователей)
  async unRateArticle(slug) {
    const res = await fetch(
      `${this.apiBase}/articles/${slug}/favorite`,
      this.getToken()
        ? {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Token ${this.getToken()}`,
            },
          }
        : null
    );

    const body = await res.json();

    return body;
  }
}

const realWorldDbService = new RealWorldDbService();

export default realWorldDbService;
