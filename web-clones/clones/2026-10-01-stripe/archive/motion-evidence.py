#!/usr/bin/env python3
"""Summarize measured live transitions and CSS motion primitives."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent
computed=json.loads((ROOT/'computed-styles.json').read_text())
css=json.loads((ROOT/'css-token-evidence.json').read_text())
key=json.loads((ROOT/'key-element-metrics.json').read_text())
important=[]
for family,values in computed['frequencies'].items():
    if family in ('transition','transitionTimingFunction','transform','filter','clipPath'):
        for item in values:
            if item['value'] not in ('all','ease'):
                important.append({'family':family,**item})
selected={
 'heroCanvas':{'engine':key['elements']['heroCanvas']['attributes']['dataEngine'],'rect':key['elements']['heroCanvas']['rect']},
 'statsDaytime':{'transition':key['elements']['statsDaytimeGradient']['styles']['transition'],'opacity':key['elements']['statsDaytimeGradient']['styles']['opacity'],'backgroundImage':key['elements']['statsDaytimeGradient']['styles']['background-image']},
 'statsSunrise':{'transition':key['elements']['statsSunriseGradient']['styles']['transition'],'opacity':key['elements']['statsSunriseGradient']['styles']['opacity'],'backgroundImage':key['elements']['statsSunriseGradient']['styles']['background-image']},
 'logoMarquee':{'width':key['elements']['logoMarquee']['styles']['width'],'height':key['elements']['logoMarquee']['styles']['height'],'transform':key['elements']['logoMarquee']['styles']['transform']}
}
out={
 'liveComputedTransitions':[x for x in computed['frequencies']['transition'] if x['value']!='all'],
 'liveTimingFunctions':computed['frequencies']['transitionTimingFunction'],
 'transformFrequency':computed['frequencies']['transform'],
 'filterFrequency':computed['frequencies']['filter'],
 'clipPathFrequency':computed['frequencies']['clipPath'],
 'cssKeyframes':css['keyframes'],
 'cssMediaConditions':css['mediaConditions'],
 'reducedMotionConditions':[x for x in css['mediaConditions'] if 'prefers-reduced-motion' in x],
 'selectedElements':selected,
 'interpretation':'The page combines one WebGL scene with sparse CSS transitions; most visible all values are component-library defaults, while the non-all declarations identify the meaningful durations and easing curves.'
}
(ROOT/'motion-evidence.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'transitionFamilies':len(out['liveComputedTransitions']),'timingFamilies':len(out['liveTimingFunctions']),'keyframes':len(out['cssKeyframes']),'reducedMotionConditions':len(out['reducedMotionConditions'])},indent=2))
