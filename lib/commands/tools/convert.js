'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n\t\t\t\tThis is an incredibly useful command that finds the sum of numbers.\n\t\t\t\tThis command is the envy of all other commands.\n\t\t\t'], ['\n\t\t\t\tThis is an incredibly useful command that finds the sum of numbers.\n\t\t\t\tThis command is the envy of all other commands.\n\t\t\t']);

var _discord = require('discord.js-commando');

var _discord2 = _interopRequireDefault(_discord);

var _commonTags = require('common-tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_commando$Command) {
	_inherits(AddNumbersCommand, _commando$Command);

	function AddNumbersCommand(client) {
		_classCallCheck(this, AddNumbersCommand);

		return _possibleConstructorReturn(this, (AddNumbersCommand.__proto__ || Object.getPrototypeOf(AddNumbersCommand)).call(this, client, {
			name: 'add-numbers',
			aliases: ['add', 'add-nums'],
			group: 'math',
			memberName: 'add',
			description: 'Adds numbers together.',
			details: (0, _commonTags.oneLine)(_templateObject),
			examples: ['add-numbers 42 1337'],

			args: [{
				key: 'numbers',
				label: 'number',
				prompt: 'What numbers would you like to add? Every message you send will be interpreted as a single number.',
				type: 'float',
				infinite: true
			}]
		}));
	}

	_createClass(AddNumbersCommand, [{
		key: 'run',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(msg, args) {
				var total;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								total = args.numbers.reduce(function (prev, arg) {
									return prev + parseFloat(arg);
								}, 0);
								return _context.abrupt('return', msg.reply(args.numbers.join(' + ') + ' = **' + total + '**'));

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function run(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return run;
		}()
	}]);

	return AddNumbersCommand;
}(_discord2.default.Command);