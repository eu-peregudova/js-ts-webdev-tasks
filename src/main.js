const sectionData = [{
  _element: 'section',
  children: [
    {
      _element: 'sectionHeader',
      children: [
        {
          _element: 'sectionTitle',
          text: 'Last works',
        }, {
          _element: 'sectionButton',
          text: 'Explore Showcase',
          _classList: ['border-gray', 'text-18']
        }
      ],
    }, {
      _element: 'cardContainer',
      children: [
        {
          _element: 'card',
          children: [
            {
              _element: 'cardTitle',
              text: 'Startup Framework',
            }, {
              _element: 'cardDescription',
              text: 'Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements.',
            }, {
              _element: 'cardButton',
              text: 'Explore',
            }
          ]
        },
        {
          _element: 'card',
          _classList: ['background-white', 'border-gray'],
          children: [
            {
              _element: 'cardTitle',
              text: 'Web Generator',
            }, {
              _element: 'cardDescription',
              _classList: ['text-blue-40'],
              text: 'Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements.',
            }, {
              _element: 'cardButton',
              text: 'Explore',
              _classList: ['background-green', 'text-white'],
            }]
        },
        {
          _element: 'card',
          _classList: ['background-blue'],
          children: [
            {
              _element: 'cardTitle',
              text: 'Slides 4',
              _classList: ['text-white'],
            }, {
              _element: 'cardDescription',
              text: 'All of these components are made in the same style, and can easily be inegrated into projects, allowing you to create hundreds of solutions for your future projects.',
              _classList: ['text-white']
            }, {
              _element: 'cardButton',
              text: 'Explore',
            }]
        },
        {
          _element: 'card',
          _classList: ['background-picture-postcards'],
          children: [
            {
              _element: 'cardTitle',
              text: 'Postcards',
              _classList: ['text-white'],
            }, {
              _element: 'cardDescription',
              text: 'All frequently used elements are now in symbols. Use them to create interfaces really fast. Easily change icons, colors and text. Add new symbols to customize your design.',
              _classList: ['text-white'],
            }, {
              _element: 'cardButton',
              text: 'Explore',
            }]
        }],
    }]
}];

class NodeBase {
  constructor(tag) {
    this.node = document.createElement(tag);
  }

  addClass(className) {
    this.node.classList.add(...className);
  }

  getNode() {
    return this.node;
  }
}

class NodeAppendable extends NodeBase {
  constructor(tag) {
    super(tag);
  }

  appendChild(child) {
    this.node.appendChild(child);
  }
}

class Heading extends NodeBase {
  constructor(text, level) {
    super(`h${level}`);
    this.node.textContent = text;
    this.addClass([`h${level}`, 'text']);
  }
}

class Button extends NodeBase {
  constructor(text) {
    super('button');
    this.node.textContent = text;
    this.addClass(['button']);
  }
}

class Paragraph extends NodeBase {
  constructor(text) {
    super('p');
    this.node.textContent = text;
    this.addClass(['text']);
  }
}

class Card extends NodeAppendable {
  constructor() {
    super('div');
    this.addClass(['card']);
  }
}

class CardContainer extends NodeAppendable {
  constructor() {
    super('div');
    this.addClass(['card-container']);
  }
}

class SectionHeader extends NodeAppendable {
  constructor() {
    super('div');
    this.addClass(['section-header']);
  }
}

class Section extends NodeAppendable {
  constructor() {
    super('section');
    this.addClass(['section']);
  }
}

class App {
  static elementRefs = {
    section: (text) => new Section(text),
    sectionHeader: () => new SectionHeader(),
    sectionTitle: (text) => new Heading(text, 1),
    sectionButton: (text) => new Button(text),
    cardContainer: () => new CardContainer(),
    card: () => new Card(),
    cardTitle: (text) => new Heading(text, 3),
    cardDescription: (text) => new Paragraph(text),
    cardButton: (text) => new Button(text),
  };

  addNodeObject(objectData) {
    const app = document.body;
    objectData.forEach((element) => {
      app.appendChild(App.createElement(element));
    });
  }

  static createElement(elementData) {
    const {_element, children, text, _classList} = elementData
    const element = App.elementRefs[_element](text);
    if (_classList) {
      element.addClass(_classList);
    }
    if (children) {
      children.forEach((child) => {
        element.appendChild(this.createElement(child));
      });
    }
    return element.getNode();
  }
}

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.addNodeObject(sectionData);
});
