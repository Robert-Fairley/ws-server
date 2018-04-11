import { expect } from 'chai';
import { I, T } from '../src/interfaces';
import {
    botMessage,
    nameField,
    parseMessage,
    userMessage,
} from '../src/chat-helpers';

describe('ChatHelpers', function() {

    const TEST_BOT: T.Bot = 'TestBot';

    it('#botMessage()', function() {
        const testBotMessage: I.BotMessage = {
            bot:     TEST_BOT,
            message: 'Testing',
        };

        it('should return a string', function(done: MochaDone) {
            expect( botMessage(testBotMessage) ).to.be.a('string');
            done();
        });

        it('should form a valid object when parsed', function(done: MochaDone) {
            let parsed = JSON.parse(
                botMessage(testBotMessage)
            );

            expect(parsed).to.be.an('object');
            expect(parsed.name).to.be.a('string');
            expect(parsed.name).to.equal(`[[[ ${parsed.name} ]]]`);
            expect(parsed.date).to.be.a('string');
            expect(parsed.message).to.be.a('string');

            done();
        });
    });

    it('#nameField()', function() {
        it('should return a string with correct formatting', function(done: MochaDone) {
            expect( nameField('USER') ).to.be.a('string');
            expect( nameField('USER') ).to.equal('[[[ USER ]]]');
            done();
        });
    });

    it('#parsedName()', function() {
        it('should return a parsed version of the input message', function(done: MochaDone) {
            let parsed = parseMessage('{{USER}}Hello World');

            expect(parsed).to.be.an('object');
            expect(parsed.user).to.be.a('string');
            expect(parsed.message).to.be.a('string');
            expect(parsed.user).to.equal('USER');
            expect(parsed.message).to.equal('Hello World');

            done();
        });
    });

    it('#userMessage()', function() {
        it('should return a string', function(done: MochaDone) {
            let parsed: I.ParsedMessage = { user: 'USER', message: 'Hello World' };
            let formed                  = userMessage(parsed);
            let parsedForm              = JSON.parse(formed);

            expect(formed).to.be.a('string');
            expect(parsedForm).to.be.an('object');
            expect(parsedForm.name).to.be.a('string');
            expect(parsedForm.date).to.be.a('string');
            expect(parsedForm.message).to.be.a('string');
            expect(parsedForm.name).to.be('[[[ USER ]]]');
            expect(parsedForm.message).to.be('Hello World');
            
            done();
        });
    });

});
