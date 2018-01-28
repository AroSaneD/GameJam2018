import { Language } from './language';

export class Card {

    get icon(): any {
        throw new Error('Not implemented');
    }

    get sound(): any {
        throw new Error('Not implemented');
    }

    // Todo more animations
    get animation(): any {
        throw new Error('Not implemented');
    }

    public isSelected = false;
    public answeredCorrectly?: boolean;

    constructor(
        public text: string,
        public iconUrl: string,
        public soundUrl: string,
        public animationUrl: string,
        public isPlaceHolder?: boolean,
        public languageBarrier?: Language
    ) {

    }

    public static get placeholderCard(): Card {
        return new Card(null, null, null, null, true);
    }

}
