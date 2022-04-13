import React from 'react';

type TaiyakiMapButtonConfig = typeof TaiyakiMapButton.defaultProps & {
  label?: string;
  icon?: string;
  action?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  loading?: boolean;
};

export default class TaiyakiMapButton extends React.Component<TaiyakiMapButtonConfig> {
  static defaultProps = {
    label: 'Button',
    icon: 'fa-flag',
    action: undefined,
    type: 'button',
    disabled: false,
    loading: false,
  };

  classes = [
    'min-w-2em',
    'border',
    'border-yellow-500',
    'rounded',
    'bg-yellow-300',
    'focus:bg-yellow-200',
    'hover:bg-yellow-200',
    'active:bg-yellow-500',
    'p-2',
    'leading-4',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ].join(' ');

  render() {
    return (
      <button
        className={this.classes}
        name={this.props.label}
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.action}
      >
        {'children' in this.props ? (
          // @ts-ignore
          this.props.children
        ) : this.props.loading ? (
          <div>
            <i
              className="fa fa-spin fa-spinner-third"
              aria-hidden="true"
              title={this.props.label}
            ></i>
            <span className="sr-only" role="alert" aria-live="polite" aria-busy="true">
              Loading
            </span>
          </div>
        ) : (
          <i className={'fa ' + this.props.icon} aria-hidden="true" title={this.props.label}></i>
        )}
      </button>
    );
  }
}
