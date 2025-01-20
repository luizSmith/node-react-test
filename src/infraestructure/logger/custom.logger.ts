import { LoggerService } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

export class CustomLogger implements LoggerService {
    private static contextRules: Record<string, number> = {}
    private readonly LOG_LEVEL_MAP: Record<string, number> = {
        trace: 0,
        debug: 1,
        info: 2,
        warm: 3,
        error: 4,
        fatal: 5,
    }


    constructor(
        @InjectPinoLogger()
        private readonly logger: PinoLogger
    ) {
        if (Object.keys(CustomLogger.contextRules).length === 0) {
            this._initializeContextRules()
        }
    }

    log(message: any, context?: string) {
        if (this.shouldLog('info', context)) {
            this.logger.info({ context }, message)
        }
    }

    error(message: any, context?: string) {
        if (this.shouldLog('error', context)) {
            this.logger.error({ context }, message)
        }
    }

    fatal(message: any, context?: string) {
        if (this.shouldLog('fatal', context)) {
            this.logger.fatal({ context }, message)
        }
    }

    warn(message: any, context?: string) {
        if (this.shouldLog('warn', context)) {
            this.logger.warn({ context }, message)
        }
    }

    debug(message: any, context?: string) {
        if (this.shouldLog('debug', context)) {
            this.logger.debug({ context }, message)
        }
    }

    verbose(message: any, context?: string) {
        if (this.shouldLog('trace', context)) {
            this.logger.trace({ context }, message)
        }
    }

    private _initializeContextRules() {
        const rules = process.env.LOG_RULES;

        if (!rules) {
            CustomLogger.contextRules['*'] = this.LOG_LEVEL_MAP['info'];
            return;
        }

        const ruleEntries = rules.split('/')
        for (const rule of ruleEntries) {
            let contextPart = '*'
            let levelPart = 'info'
            const parts = rule.split(';')

            for (const part of parts) {
                if (part.startsWith('context=')) {
                    contextPart = part.split('=')[1] || contextPart
                } else if (part.startsWith('level=')) {
                    levelPart = part.split('=')[1] || levelPart;
                }
            }


            const contexts = contextPart.split(',')
            const numericLevel = this.LOG_LEVEL_MAP[levelPart.trim()] || this.LOG_LEVEL_MAP['info'];

            for (const context of contexts) {
                CustomLogger.contextRules[context.trim()] = numericLevel;
            }

        }

    }

    private shouldLog(methodLevel: string, context: string): boolean {
        return this.LOG_LEVEL_MAP[methodLevel] >= this.getLogLevel(context);
    }

    private getLogLevel(context?: string): number {
        context = context || '';

        const level = CustomLogger.contextRules[context] ??
            CustomLogger.contextRules['*'] ??
            this.LOG_LEVEL_MAP['info'];

        return level
    }

}